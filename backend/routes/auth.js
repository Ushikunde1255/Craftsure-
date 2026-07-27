const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email exists" });
    
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || 'customer' });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'craftsure_secret_123', { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.log("REGISTER ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    // IMPORTANT: select password explicitly
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log("Login failed: user not found", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (!user.password) {
      console.log("Login failed: user.password is undefined for", email);
      return res.status(500).json({ message: "Password not set for user" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'craftsure_secret_123', { expiresIn: '7d' });
    console.log("LOGIN SUCCESS:", user.email);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.log("LOGIN ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
