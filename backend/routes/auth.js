const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role, location, skill } = req.body;
    if (!name || !email || !phone || !password) return res.status(400).json({ msg: 'All fields required!' });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Email already exists!' });

    const hashed = await bcrypt.hash(password, 10);
    user = new User({ name, email, phone, password: hashed, role, location, skill });
    await user.save();

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
      process.env.JWT_SECRET || 'craftsure_secret_2024',
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Wrong password!' });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
      process.env.JWT_SECRET || 'craftsure_secret_2024',
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, location: user.location } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
