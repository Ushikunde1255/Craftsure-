const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.post('/signup', async (req,res)=>{
  try{
    const { role, name, phone, email, password, id_number, trades, bank_code, account_number } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(`INSERT INTO users (role, name, phone, email, password_hash, id_number, trades, bank_code, account_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id, role, name, email`, [role, name, phone, email, hash, id_number, trades||[], bank_code, account_number]);
    const token = jwt.sign({ userId: result.rows[0].id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: result.rows[0] });
  }catch(e){ res.status(400).json({ error: e.message }); }
});

router.post('/login', async (req,res)=>{
  try{
    const { email, password } = req.body;
    const r = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    if(!r.rows[0]) return res.status(400).json({ error: 'User not found' });
    const ok = await bcrypt.compare(password, r.rows[0].password_hash);
    if(!ok) return res.status(400).json({ error: 'Wrong password' });
    const token = jwt.sign({ userId: r.rows[0].id, role: r.rows[0].role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: r.rows[0] });
  }catch(e){ res.status(400).json({ error: e.message }); }
});

module.exports = router;
