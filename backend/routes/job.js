const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

let Job;
try {
  Job = mongoose.model('Job');
} catch {
  const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'open' }
  }, { timestamps: true });
  Job = mongoose.model('Job', jobSchema);
}

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, budget } = req.body;
    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields required" });
    }
    const userId = req.user.id || req.user._id;
    const job = await Job.create({
      title: title.trim(),
      description: description.trim(),
      budget: Number(budget),
      user: userId,
      postedBy: userId
    });
    res.status(201).json(job);
  } catch (err) {
    console.log("CREATE JOB ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
