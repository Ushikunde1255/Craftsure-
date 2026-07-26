const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

// Define Job model HERE if no models/Job.js exists
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

// GET /api/jobs - Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.log("GET JOBS ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/jobs - Create job (needs login)
router.post('/', auth, async (req, res) => {
  try {
    console.log("CREATE JOB BODY:", req.body);
    console.log("CREATE JOB USER:", req.user);

    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "Title, description, budget required" });
    }

    const userId = req.user.id || req.user._id || req.user.userId;

    const job = await Job.create({
      title: title.trim(),
      description: description.trim(),
      budget: Number(budget),
      user: userId,
      postedBy: userId
    });

    console.log("JOB CREATED SUCCESS:", job._id);
    res.status(201).json(job);

  } catch (err) {
    console.log("CREATE JOB CRASH:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
