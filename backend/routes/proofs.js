const express = require('express');
const multer = require('multer');
const { auth } = require('../middleware/auth');
const Job = require('../models/Job');
const { cloudinary, storage } = require('../utils/cloudinary');

const router = express.Router();

// Configure multer with Cloudinary storage
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'), false);
    }
  }
});

// @route POST /api/proofs/:jobId - Upload proof
router.post('/:jobId', auth, upload.single('proof'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    // Only artisan assigned or admin can upload proof
    const isArtisan = job.artisan && job.artisan.toString() === req.user._id.toString();
    if (!isArtisan && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Only assigned artisan can upload proof' });
    }

    if (!req.file) {
      return res.status(400).json({ msg: 'No image uploaded' });
    }

    const proof = {
      url: req.file.path,
      uploadedBy: req.user._id
    };

    job.proofs.push(proof);
    await job.save();

    const io = req.app.get('io');
    io.to(job.client.toString()).emit('new_proof', { jobId: job._id, proof });

    res.json({ msg: 'Proof uploaded', proof, job });

  } catch (err) {
    console.error('Proof upload error:', err);
    res.status(500).json({ msg: 'Upload failed', error: err.message });
  }
});

// @route GET /api/proofs/:jobId - List proofs
router.get('/:jobId', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).select('proofs client artisan');
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    const isParticipant = 
      job.client.toString() === req.user._id.toString() ||
      (job.artisan && job.artisan.toString() === req.user._id.toString()) ||
      req.user.role === 'admin';

    if (!isParticipant) {
      return res.status(403).json({ msg: 'Not authorized to view proofs' });
    }

    res.json({ proofs: job.proofs });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch proofs' });
  }
});

module.exports = router;
