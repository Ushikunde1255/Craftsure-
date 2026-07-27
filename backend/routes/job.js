const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, budget, location, category, image } = req.body;
    if (!title || !description || !budget) {
      return res.status(400).json({ msg: 'Title, description and budget required' });
    }
    const job = new Job({
      title,
      description,
      budget: Number(budget),
      location: location || 'Makurdi, Benue',
      category: category || 'Plumbing',
      image: image || '',
      postedBy: req.user.id,
      customerName: req.user.name || 'User'
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ msg: 'Failed: ' + err.message });
  }
});

module.exports = router;
