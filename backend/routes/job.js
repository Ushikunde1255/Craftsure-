const express = require('express');
const Job = require('../models/Job');
const { auth } = require('../middleware/auth');
const { validate, jobSchema } = require('../middleware/validate');

const router = express.Router();

// @route   POST /api/jobs  - Create job (client only)
router.post('/', auth, validate(jobSchema), async (req, res) => {
  try {
    if (req.user.role !== 'client' && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Only clients can post jobs' });
    }

    const job = await Job.create({
      ...req.body,
      client: req.user._id
    });

    const io = req.app.get('io');
    io.emit('new_job', job);

    res.status(201).json({ msg: 'Job created', job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to create job' });
  }
});

// @route   GET /api/jobs - List jobs with filters
router.get('/', async (req, res) => {
  try {
    const { category, status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$text = { $search: search };
    }

    const jobs = await Job.find(query)
      .populate('client', 'name avatar rating')
      .populate('artisan', 'name avatar rating')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Job.countDocuments(query);

    res.json({ jobs, total, page: parseInt(page) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch jobs' });
  }
});

// @route   GET /api/jobs/:id - Single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('client', 'name avatar phone rating completedJobs')
      .populate('artisan', 'name avatar phone rating completedJobs');

    if (!job) return res.status(404).json({ msg: 'Job not found' });

    res.json({ job });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch job' });
  }
});

// @route   PATCH /api/jobs/:id/assign - Assign artisan to job
router.patch('/:id/assign', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.client.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const { artisanId } = req.body;
    job.artisan = artisanId;
    job.status = 'assigned';
    await job.save();

    res.json({ msg: 'Artisan assigned', job });
  } catch (err) {
    res.status(500).json({ msg: 'Assign failed' });
  }
});

// @route   PATCH /api/jobs/:id/status - Update status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['in_progress', 'completed', 'cancelled'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    // Only client or artisan involved can update
    const isParticipant = 
      job.client.toString() === req.user._id.toString() ||
      (job.artisan && job.artisan.toString() === req.user._id.toString());

    if (!isParticipant && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    job.status = status;
    await job.save();

    const io = req.app.get('io');
    io.to(job.client.toString()).emit('job_update', job);
    if (job.artisan) io.to(job.artisan.toString()).emit('job_update', job);

    res.json({ msg: 'Status updated', job });
  } catch (err) {
    res.status(500).json({ msg: 'Status update failed' });
  }
});

module.exports = router;
