const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validate, registerSchema, loginSchema } = require('../middleware/validation');

const router = express.Router();

// REGISTER
router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    let { name, email, password, role, phone, location } = req.body;

    if (role) {
      role = role.toLowerCase();
      if (role === 'homeowner') role = 'client';
    } else {
      role = 'client';
    }

    console.log('REGISTER ATTEMPT:', { name, email, role });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
      phone,
      location
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      msg: 'User created',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('REGISTER ERROR:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// LOGIN
router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
