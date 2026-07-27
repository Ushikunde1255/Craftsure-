const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET ALL JOBS
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

// POST JOB - OPEN FOR ALL - REAL JOBS ONLY
router.post('/', auth, upload.single('photo'), async (req, res) => {
  try {
    const { title, description, budget, location, category } = req.body;

    // REAL JOB VALIDATION - Your idea!
    if (!description || description.length < 20) {
      return res.status(400).json({ msg: 'Describe work well, at least 20 chars. Real jobs only!' });
    }
    if (!budget || Number(budget) < 1000) {
      return res.status(400).json({ msg: 'Budget must be at least ₦1,000. No ₦0 jobs!' });
    }
    if (!location) {
      return res.status(400).json({ msg: 'Location required. Real jobs need real place!' });
    }

    // Upload photo to Cloudinary if exists
    if (!req.file) {
  return res.status(400).json({ msg: 'Photo is REQUIRED! Real jobs must have photo proof!' });
    }
    let photoUrl = '';
    let photoId = '';
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'craftsure_jobs' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      photoUrl = uploadResult.secure_url;
      photoId = uploadResult.public_id;
    }

    const job = new Job({
      title: title || category || 'Need artisan',
      description,
      budget: Number(budget),
      location: location || 'Makurdi, Benue',
      category: category || 'Plumbing',
      image: photoUrl,          // for old frontend
      photoUrl: photoUrl,       // for new frontend
      photoId: photoId,
      postedBy: req.user.id,
      customerName: req.user.name || 'User',
      postedBySkill: req.user.skill || req.user.role || 'Client',
      email: req.user.email
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ msg: 'Failed: ' + err.message });
  }
});// DELETE job + delete photo from Cloudinary
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    // Optional: delete photo from Cloudinary
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
