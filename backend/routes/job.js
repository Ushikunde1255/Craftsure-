const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// POST job with photo REQUIRED
router.post('/', auth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'Photo is REQUIRED!' });
    }
    if (!req.body.description || req.body.description.trim().length < 20) {
      return res.status(400).json({ msg: 'Describe work well! At least 20 chars' });
    }
    if (!req.body.budget || Number(req.body.budget) < 1000) {
      return res.status(400).json({ msg: 'Budget must be at least ₦1,000' });
    }

    let photoUrl = '';
    let photoId = '';
    
    try {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
        { folder: 'craftsure' }
      );
      photoUrl = result.secure_url;
      photoId = result.public_id;
    } catch (e) {
      console.log('Cloudinary error:', e.message);
      return res.status(500).json({ msg: 'Photo upload failed, try smaller photo: ' + e.message });
    }

    const job = new Job({
      title: req.body.title || req.body.category,
      category: req.body.category,
      location: req.body.location,
      budget: req.body.budget,
      description: req.body.description,
      photoUrl: photoUrl,
      photoId: photoId,
      image: photoUrl,
      customerName: req.user.name || 'User',
      postedBy: req.user.id,
      email: req.user.email
    });

    await job.save();
    res.json(job);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

// DELETE job
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.photoId) {
      try {
        await cloudinary.uploader.destroy(job.photoId);
      } catch (e) {}
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
