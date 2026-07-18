const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Pool } = require('pg');
const { authenticate } = require('../middleware/auth');
const { uploadBuffer } = require('../services/cloudinary');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10*1024*1024 } });

router.post('/', authenticate, async (req,res)=>{
  const { title, trade, description, location, budget, is_emergency } = req.body;
  const surcharge = is_emergency? Number(budget)*0.2 : 0;
  const r = await pool.query(`INSERT INTO jobs (client_id, title, trade, description, location, budget, is_emergency, emergency_surcharge, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'open') RETURNING *`, [req.user.userId, title, trade, description, location, budget, is_emergency, surcharge]);
  res.json({ success: true, job: r.rows[0] });
  req.app.get('io').emit('job:new', r.rows[0]);
});

router.get('/my/client', authenticate, async (req,res)=>{
  const jobs = await pool.query(`SELECT * FROM jobs WHERE client_id=$1 ORDER BY created_at DESC`, [req.user.userId]);
  for(let j of jobs.rows){ const m = await pool.query(`SELECT * FROM milestones WHERE job_id=$1`, [j.id]); j.milestones=m.rows; }
  res.json({ success: true, jobs: jobs.rows });
});

router.get('/my/worker', authenticate, async (req,res)=>{
  const u = await pool.query(`SELECT trades FROM users WHERE id=$1`, [req.user.userId]);
  const trades = u.rows[0]?.trades || [];
  const jobs = await pool.query(`SELECT j.*, us.name as client_name FROM jobs j JOIN users us ON j.client_id=us.id WHERE j.worker_id=$1 OR (j.status='open' AND j.trade=ANY($2::text[])) ORDER BY j.is_emergency DESC, j.created_at DESC`, [req.user.userId, trades]);
  for(let j of jobs.rows){ const m = await pool.query(`SELECT * FROM milestones WHERE job_id=$1`, [j.id]); j.milestones=m.rows; }
  const bal = await pool.query(`SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id=$1`, [req.user.userId]);
  res.json({ success: true, jobs: jobs.rows, balance: bal.rows[0].balance });
});

router.post('/:id/accept', authenticate, async (req,res)=>{
  await pool.query(`UPDATE jobs SET worker_id=$1, status='in_progress' WHERE id=$2`, [req.user.userId, req.params.id]);
  res.json({ success: true });
  req.app.get('io').to(`job:${req.params.id}`).emit('job:accepted', { jobId: req.params.id });
  req.app.get('io').emit('job:accepted', { jobId: req.params.id });
});

router.post('/:id/milestones', authenticate, upload.array('proofs',5), async (req,res)=>{
  const { amount, description } = req.body;
  let urls = [];
  if(req.files?.length){ for(const f of req.files){ const up = await uploadBuffer(f.buffer, `craftsure/${req.params.id}`); urls.push(up.secure_url); } }
  const r = await pool.query(`INSERT INTO milestones (job_id, worker_id, amount, description, proof_urls, status) VALUES ($1,$2,$3,$4,$5,'pending') RETURNING *`, [req.params.id, req.user.userId, amount, description, urls]);
  res.json({ success: true, milestone: r.rows[0] });
  const io = req.app.get('io');
  io.to(`job:${req.params.id}`).emit('milestone:new', r.rows[0]);
  const jobR = await pool.query(`SELECT client_id FROM jobs WHERE id=$1`, [req.params.id]);
  if(jobR.rows[0]) io.to(`user:${jobR.rows[0].client_id}`).emit('notification', { title: 'New Proof', message: description });
});

router.post('/milestones/:id/approve', authenticate, async (req,res)=>{
  const m = await pool.query(`SELECT * FROM milestones WHERE id=$1`, [req.params.id]);
  const ms = m.rows[0];
  if(!ms) return res.status(404).json({ error: 'Not found' });
  await pool.query(`UPDATE milestones SET status='approved' WHERE id=$1`, [req.params.id]);
  const jobR = await pool.query(`SELECT * FROM jobs WHERE id=$1`, [ms.job_id]);
  const job = jobR.rows[0];
  const payout = Number(ms.amount)*0.97;
  const { transfer } = require('../services/paystack');
  const worker = await pool.query(`SELECT bank_code, account_number FROM users WHERE id=$1`, [job.worker_id]);
  if(worker.rows[0]?.bank_code){ try{ await transfer(payout, worker.rows[0].account_number, worker.rows[0].bank_code); }catch(e){ console.log('transfer failed', e.message); } }
  await pool.query(`INSERT INTO transactions (user_id, job_id, milestone_id, amount, type, status) VALUES ($1,$2,$3,$4,'payout','success')`, [job.worker_id, job.id, ms.id, payout]);
  res.json({ success: true, payout });
  req.app.get('io').to(`user:${job.worker_id}`).emit('payment:received', { amount: payout, milestone: ms.id });
});

module.exports = router;
