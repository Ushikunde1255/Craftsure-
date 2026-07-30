const express = require('express');
const EscrowJob = require('../models/EscrowJob');
const Chat = require('../models/Chat');
const Rating = require('../models/Rating');
const router = express.Router();

// 1. Client funds job - create escrow WITH FEE 5%+10%=15%
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
  }catch(e){ res.status(500).json({error:e.message}); }
});

// 2. Upload evidence
router.post('/upload/:id/:stage', async (req,res)=>{
  const { photos } = req.body;
  const escrow = await EscrowJob.findById(req.params.id);
  escrow[req.params.stage].evidencePhotos = photos;
  escrow[req.params.stage].status = 'uploaded';
  escrow[req.params.stage].uploadedAt = new Date();
  await escrow.save();
  res.json(escrow);
});

// 3. Approve
router.post('/approve/:id/:stage', async (req,res)=>{
  const escrow = await EscrowJob.findById(req.params.id);
  escrow[req.params.stage].status = 'paid';
  escrow[req.params.stage].approvedAt = new Date();
  if(req.params.stage==='m100') escrow.overallStatus='completed';
  else escrow.overallStatus='in_progress';
  await escrow.save();
  res.json({ message:`${escrow[req.params.stage].percent}% approved! Pay ₦${escrow[req.params.stage].artisanAmount} to artisan`, escrow, payAmount: escrow[req.params.stage].artisanAmount });
});

// 4. My escrows
router.get('/my/:userId', async (req,res)=>{
  const jobs = await EscrowJob.find({ $or:[{clientId:req.params.userId},{artisanId:req.params.userId}] }).sort({createdAt:-1});
  res.json(jobs);
});

router.get('/:id', async (req,res)=>{
  const job = await EscrowJob.findById(req.params.id);
  res.json(job);
});

// 5. Admin stats
router.get('/admin/stats', async (req,res)=>{
  const all = await EscrowJob.find();
  const totalProfit = all.reduce((sum,j)=> sum + (j.craftsureProfit||0), 0);
  const totalClientFee = all.reduce((sum,j)=> sum + (j.clientFee||0), 0);
  const totalArtisanFee = all.reduce((sum,j)=> sum + (j.artisanFee||0), 0);
  const totalArtisanPaid = all.reduce((sum,j)=> sum + (j.totalReceivedByArtisan||0), 0);
  const completed = all.filter(j=>j.overallStatus==='completed').length;
  const pending = all.filter(j=>j.m35?.status==='uploaded' || j.m75?.status==='uploaded' || j.m100?.status==='uploaded').length;
  res.json({ totalJobs: all.length, totalProfit, totalClientFee, totalArtisanFee, totalArtisanPaid, completed, pending, allJobs: all.slice(0,50) });
});

// 6. CHAT - Anti-bypass!
router.post('/chat/:escrowId', async (req,res)=>{
  const { clientId, clientName, artisanId, artisanName, jobId, jobTitle, senderId, senderName, text } = req.body;
  const phoneRegex = /(\+?234|0)?[789][01]\d{8}|\+233\d{9}|.*\d{10,}.*/;
  const isPhoneAttempt = phoneRegex.test(text) || text.toLowerCase().includes('whatsapp') || text.toLowerCase().includes('call me');
  let chat = await Chat.findOne({ escrowId: req.params.escrowId });
  if (!chat) {
    chat = new Chat({ escrowId: req.params.escrowId, jobId, jobTitle, clientId, clientName, artisanId, artisanName, messages: [] });
  }
  chat.messages.push({ senderId, senderName, text: isPhoneAttempt? text + ' [⚠️ PHONE ATTEMPT - Admin sees this!]' : text, isPhoneAttempt });
  await chat.save();
  res.json(chat);
});

router.get('/chat/:escrowId', async (req,res)=>{
  const chat = await Chat.findOne({ escrowId: req.params.escrowId });
  res.json(chat || { messages: [] });
});

router.get('/admin/chats', async (req,res)=>{
  const chats = await Chat.find().sort({ createdAt: -1 }).limit(50);
  res.json(chats);
});

// 7. RATING
router.post('/rate', async (req,res)=>{
  const { artisanId, artisanName, clientId, clientName, escrowId, jobTitle, stars, comment } = req.body;
  const rating = new Rating({ artisanId, artisanName, clientId, clientName, escrowId, jobTitle, stars, comment });
  await rating.save();
  res.json(rating);
});

router.get('/ratings/:artisanId', async (req,res)=>{
  const ratings = await Rating.find({ artisanId: req.params.artisanId });
  const avg = ratings.length? (ratings.reduce((s,r)=>s+r.stars,0)/ratings.length).toFixed(1) : 0;
  res.json({ ratings, avg, count: ratings.length });
});

router.get('/admin/ratings', async (req,res)=>{
  const ratings = await Rating.find().sort({ createdAt: -1 });
  res.json(ratings);
});
// 8. ADMIN DELETE - Delete old test escrow
router.delete('/admin/delete/:id', async (req,res)=>{
  await EscrowJob.findByIdAndDelete(req.params.id);
  res.json({ message:'Deleted' });
});
router.delete('/:id', async (req,res)=>{
  await EscrowJob.findByIdAndDelete(req.params.id);
  res.json({ message:'Deleted' });
});
module.exports = router;
