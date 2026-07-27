const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');

// GET all jobs - anyone can see
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

// POST job - ANY logged in user can post (artisan or customer) - FIXED!
router.post('/', auth, async (req, res) => {
  try {
    console.log('Post job body:', req.body);
    console.log('User:', req.user);

    const { title, description, budget, location, category } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ msg: 'Title, description and budget required' });
    }

    const job = new Job({
      title,
      description,
      budget: Number(budget),
      location: location || 'Makurdi, Benue',
      category: category || 'Plumbing',
      postedBy: req.user.id,
      customerName: req.user.name || 'User'
    });

    await job.save();
    console.log('Job saved:', job.title);
    res.status(201).json(job);

  } catch (err) {
    console.log('Job post error:', err.message);
    res.status(500).json({ msg: 'Failed to save: ' + err.message });
  }
});

module.exports = router;
