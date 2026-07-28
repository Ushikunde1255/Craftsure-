const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024}
});

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/', auth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'Photo required!' });

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI, { folder: 'craftsure_jobs' });

    const job = new Job({
      category: req.body.category,
      title: req.body.title || req.body.category,
      description: req.body.description,
      location: req.body.location,
      budget: req.body.budget,
      photoUrl: result.secure_url,
      image: result.secure_url,
      customerName: req.user.name,
      customerPhone: req.user.phone,
      customerId: req.user.id,
      customerEmail: req.user.email
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.customerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not your job!' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
