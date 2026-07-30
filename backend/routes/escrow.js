const express = require('express');
const EscrowJob = require('../models/EscrowJob');
const router = express.Router();

// 1. Client funds job - create escrow WITH CRAFTSURE FEE! 5% + 10% = 15% YOUR MONEY!
router.post('/create', async (req,res)=>{
  try{
    const { jobId, jobTitle, clientId, clientName, artisanId, artisanName, artisanPhone, totalAmount } = req.body;

    const artisanPrice = Number(totalAmount) || 100000;
    const clientFeePercent = 5;
    const artisanFeePercent = 10;
    const clientFee = Math.round(artisanPrice * clientFeePercent / 100);
    const artisanFee = Math.round(artisanPrice * artisanFeePercent / 100);
    const totalPaidByClient = artisanPrice + clientFee;
    const totalReceivedByArtisan = artisanPrice - artisanFee;
    const craftsureProfit = clientFee + artisanFee;

    const escrow = new EscrowJob({
      jobId, jobTitle, clientId, clientName, artisanId, artisanName, artisanPhone,
      artisanPrice, clientFeePercent, artisanFeePercent, clientFee, artisanFee,
      totalPaidByClient, totalReceivedByArtisan, craftsureProfit,
      m35: { percent:35, craftsureAmount: Math.round(craftsureProfit*0.35), artisanAmount: Math.round(totalReceivedByArtisan*0.35), status:'pending', evidencePhotos:[] },
      m75: { percent:40, craftsureAmount: Math.round(craftsureProfit*0.40), artisanAmount: Math.round(totalReceivedByArtisan*0.40), status:'pending', evidencePhotos:[] },
      m100: { percent:25, craftsureAmount: Math.round(craftsureProfit*0.25), artisanAmount: Math.round(totalReceivedByArtisan*0.25), status:'pending', evidencePhotos:[] },
      overallStatus:'funded'
    });

    await escrow.save();
    res.json(escrow);
  }catch(e){
    console.log(e);
    res.status(500).json({error:e.message});
  }
});

// 2. Artisan uploads evidence for 35% / 75% / 100%
router.post('/upload/:id/:stage', async (req,res)=>{
  const { photos } = req.body;
  const escrow = await EscrowJob.findById(req.params.id);
  escrow[req.params.stage].evidencePhotos = photos;
  escrow[req.params.stage].status = 'uploaded';
  escrow[req.params.stage].uploadedAt = new Date();
  await escrow.save();
  res.json(escrow);
});

// 3. Client APPROVES milestone
router.post('/approve/:id/:stage', async (req,res)=>{
  const escrow = await EscrowJob.findById(req.params.id);
  escrow[req.params.stage].status = 'paid';
  escrow[req.params.stage].approvedAt = new Date();
  if(req.params.stage==='m100') escrow.overallStatus = 'completed';
  else escrow.overallStatus = 'in_progress';
  await escrow.save();

  const percent = escrow[req.params.stage].percent;
  const payAmount = escrow[req.params.stage].artisanAmount;

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
// 5. ADMIN STATS - Total profit dashboard!
router.get('/admin/stats', async (req,res)=>{
  const all = await EscrowJob.find();
  const totalProfit = all.reduce((sum,j)=> sum + (j.craftsureProfit||0), 0);
  const totalClientFee = all.reduce((sum,j)=> sum + (j.clientFee||0), 0);
  const totalArtisanFee = all.reduce((sum,j)=> sum + (j.artisanFee||0), 0);
  const totalArtisanPaid = all.reduce((sum,j)=> sum + (j.totalReceivedByArtisan||0), 0);
  const completed = all.filter(j=>j.overallStatus==='completed').length;
  const pending = all.filter(j=>j.m35?.status==='uploaded' || j.m75?.status==='uploaded' || j.m100?.status==='uploaded').length;

  res.json({
    totalJobs: all.length,
    totalProfit,
    totalClientFee,
    totalArtisanFee,
    totalArtisanPaid,
    completed,
    pending,
    allJobs: all.slice(0,50) // last 50
  });
});
module.exports = router;
