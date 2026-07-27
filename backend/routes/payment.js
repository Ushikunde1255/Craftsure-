const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  res.json({ message: "Payment initialized", status: "success" });
});

router.get('/', auth, async (req, res) => {
  res.json([]);
});

module.exports = router;
