const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

let Proof;
try {
  Proof = mongoose.model('Proof');
} catch {
  const proofSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    description: { type: String, required: true },
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }, { timestamps: true });
  Proof = mongoose.model('Proof', proofSchema);
}

router.get('/', auth, async (req, res) => {
  try {
    const proofs = await Proof.find().sort({ createdAt: -1 });
    res.json(proofs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { job, description, image } = req.body;
    const userId = req.user.id || req.user._id;
    const proof = await Proof.create({ job, description, image, user: userId });
    res.status(201).json(proof);
  } catch (err) {
    console.log("PROOF ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
