const express = require('express');
const axios = require('axios');
const Job = require('../models/Job');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Initialize Paystack payment
// @route POST /api/payments/initialize
router.post('/initialize', auth, async (req, res) => {
  try {
    const { jobId, email } = req.body;

    if (!jobId) return res.status(400).json({ msg: 'jobId required' });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Not your job' });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ msg: 'Paystack not configured' });
    }

    const amountInKobo = Math.round(job.budget * 100);

    const paystackRes = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: email || req.user.email,
        amount: amountInKobo,
        reference: `craftsure_${job._id}_${Date.now()}`,
        metadata: {
          jobId: job._id.toString(),
          clientId: req.user._id.toString()
        },
        callback_url: `${process.env.FRONTEND_URL}/payment/verify`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Save reference
    job.paystackRef = paystackRes.data.data.reference;
    job.paymentStatus = 'pending';
    await job.save();

    res.json({
      msg: 'Payment initialized',
      authorization_url: paystackRes.data.data.authorization_url,
      reference: paystackRes.data.data.reference
    });

  } catch (err) {
    console.error('Paystack init error:', err.response?.data || err.message);
    res.status(500).json({ msg: 'Payment initialization failed', error: err.response?.data?.message });
  }
});

// Verify payment
// @route GET /api/payments/verify/:reference
router.get('/verify/:reference', auth, async (req, res) => {
  try {
    const { reference } = req.params;

    const verifyRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const data = verifyRes.data.data;

    if (data.status === 'success') {
      const jobId = data.metadata.jobId;
      const job = await Job.findById(jobId);
      if (job) {
        job.paymentStatus = 'escrow';
        await job.save();
      }
      return res.json({ msg: 'Payment verified', status: 'escrow', data });
    }

    res.json({ msg: 'Payment not successful', status: data.status });

  } catch (err) {
    console.error('Verify error:', err.response?.data || err.message);
    res.status(500).json({ msg: 'Verification failed' });
  }
});

// Release payment to artisan (admin or client after completion)
// @route POST /api/payments/release/:jobId
router.post('/release/:jobId', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.client.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to release' });
    }

    if (job.status !== 'completed') {
      return res.status(400).json({ msg: 'Job must be completed first' });
    }

    job.paymentStatus = 'released';
    await job.save();

    const io = req.app.get('io');
    if (job.artisan) io.to(job.artisan.toString()).emit('payment_released', job);

    res.json({ msg: 'Payment released to artisan', job });
  } catch (err) {
    res.status(500).json({ msg: 'Release failed' });
  }
});

module.exports = router;
