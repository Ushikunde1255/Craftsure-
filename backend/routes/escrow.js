const express = require('express');
const EscrowJob = require('../models/EscrowJob');
const router = express.Router();

// 1. Client funds job - create escrow
router.post('/create', async (req,res)=>{
  const { jobId, jobTitle, clientId, clientName, artisanId, artisanName, artisanPhone, totalAmount } = req.body;
  const escrow = new EscrowJob({ jobId, jobTitle, clientId, clientName, artisanId, artisanName, artisanPhone, totalAmount });
  await escrow.save();
  res.json(escrow);
});

// 2. Artisan uploads evidence for 35% / 75% / 100%
router.post('/upload/:id/:stage', async (req,res)=>{
  const { photos } = req.body; // array of photo URLs
  const escrow = await EscrowJob.findById(req.params.id);
  escrow[req.params.stage].evidencePhotos = photos;
  escrow[req.params.stage].status = 'uploaded';
  escrow[req.params.stage].uploadedAt = new Date();
  await escrow.save();
  res.json(escrow);
});

// 3. Client APPROVES milestone - this will later trigger Paystack transfer
router.post('/approve/:id/:stage', async (req,res)=>{
  const escrow = await EscrowJob.findById(req.params.id);
  escrow[req.params.stage].status = 'paid'; // in real Paystack, change to approved then transfer
  escrow[req.params.stage].approvedAt = new Date();

  // Update overall
  if(req.params.stage==='m100') escrow.overallStatus = 'completed';
  else escrow.overallStatus = 'in_progress';

  await escrow.save();

  // TODO: Paystack Transfer here - amount = total * percent * 0.9 (you keep 10%)
  const percent = escrow[req.params.stage].percent;
  const payAmount = escrow.totalAmount * (percent/100) * 0.9;

  res.json({ message:`${percent}% approved! Pay ₦${payAmount} to artisan`, escrow, payAmount });
});

// 4. Get all escrows for artisan or client
router.get('/my/:userId', async (req,res)=>{
  const jobs = await EscrowJob.find({ $or:[{clientId:req.params.userId},{artisanId:req.params.userId}] }).sort({createdAt:-1});
  res.json(jobs);
});

router.get('/:id', async (req,res)=>{
  const job = await EscrowJob.findById(req.params.id);
  res.json(job);
});

module.exports = router;
