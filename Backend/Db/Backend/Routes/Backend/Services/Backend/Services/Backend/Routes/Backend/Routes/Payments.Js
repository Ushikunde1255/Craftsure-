const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const { authenticate } = require('../middleware/auth');
const { initializePayment } = require('../services/paystack');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.post('/initialize', authenticate, async (req,res)=>{
  const { job_id, amount, email } = req.body;
  const ref = `CS_${job_id}_${Date.now()}`;
  const data = await initializePayment(email, amount, ref);
  await pool.query(`INSERT INTO transactions (user_id, job_id, amount, type, reference, status) VALUES ($1,$2,$3,'escrow',$4,'pending')`, [req.user.userId, job_id, amount, ref]);
  res.json({ success: true, authorization_url: data.authorization_url, reference: ref });
});

module.exports = router;
