const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// GET - public - Show all jobs newest first, no filter
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    const enriched = jobs.map(j => {
      const obj = j.toObject ? j.toObject() : j;
      return {
        ...obj,
        customerName: obj.customerName || 'Client',
        customerPhone: obj.customerPhone || '',
        photoUrl: obj.photoUrl || obj.image || obj.photo || ''
      };
    });
    res.json(enriched);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e.message });
  }
});

// POST - needs login + photo
router.post('/', auth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'Photo required' });

    // Convert buffer to base64 data URL (works without Cloudinary)
    const photoUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const job = new Job({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      budget: req.body.budget,
      photoUrl: photoUrl,
      image: photoUrl,
      photo: photoUrl,
      customerName: req.user.name,
      customerPhone: req.user.phone,
      user: req.user.id
    });

    await job.save();
    res.status(201).json({ msg: 'Job Posted!', job });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e.message });
  }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

module.exports = router;
