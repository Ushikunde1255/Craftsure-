const express = require('express');
const crypto = require('crypto');
const Job = require('../models/Job');

const router = express.Router();

// Paystack webhook - uses express.raw() from server.js
// @route POST /api/webhooks/paystack
router.post('/paystack', async (req, res) => {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    
    if (!secret) {
      console.error('PAYSTACK_SECRET_KEY missing');
      return res.status(500).send('Webhook not configured');
    }

    // ===== HMAC VERIFICATION - SECURITY CRITICAL =====
    const hash = crypto
      .createHmac('sha512', secret)
      .update(req.body)
      .digest('hex');

    const signature = req.headers['x-paystack-signature'];

    if (!signature || hash !== signature) {
      console.warn('Invalid Paystack webhook signature');
      return res.status(401).send('Invalid signature');
    }

    // Parse body after verification
    const event = JSON.parse(req.body.toString());
    console.log('Paystack webhook event:', event.event);

    if (event.event === 'charge.success') {
      const data = event.data;
      const reference = data.reference;
      const jobId = data.metadata?.jobId;

      if (jobId) {
        const job = await Job.findById(jobId);
        if (job) {
          job.paymentStatus = 'escrow';
          job.paystackRef = reference;
          await job.save();
          console.log(`Job ${jobId} marked as escrow via webhook`);
        }
      }
    }

    // Always return 200 to Paystack
    res.status(200).send('Webhook processed');

  } catch (err) {
    console.error('Webhook error:', err.message);
    // Still return 200 to prevent Paystack retries for our errors
    // but log the failure
    res.status(200).send('Webhook received with errors');
  }
});

// Test endpoint - remove in production
router.get('/paystack/test', (req, res) => {
  res.json({ msg: 'Webhook endpoint active - POST /api/webhooks/paystack' });
});

module.exports = router;
