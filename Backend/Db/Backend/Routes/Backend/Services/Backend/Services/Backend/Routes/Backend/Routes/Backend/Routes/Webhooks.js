const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.post('/paystack', express.json({ verify: (req,res,buf)=>{ req.rawBody=buf; } }), async (req,res)=>{
  const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(req.rawBody).digest('hex');
  if(hash!== req.headers['x-paystack-signature']) return res.status(400).send('Invalid signature');
  const event = req.body;
  if(event.event === 'charge.success'){
    const ref = event.data.reference;
    await pool.query(`UPDATE transactions SET status='success' WHERE reference=$1`, [ref]);
    const tr = await pool.query(`SELECT * FROM transactions WHERE reference=$1`, [ref]);
    if(tr.rows[0]){ req.app.get('io').to(`user:${tr.rows[0].user_id}`).emit('payment:verified', { reference: ref, amount: tr.rows[0].amount }); }
  }
  res.sendStatus(200);
});

module.exports = router;
