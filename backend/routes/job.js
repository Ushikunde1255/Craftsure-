
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.log("GET JOBS ERROR:", err.message);
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
    console.log("JOB CREATED:", job._id);
    res.status(201).json(job);
  } catch (err) {
    console.log("CREATE JOB ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
