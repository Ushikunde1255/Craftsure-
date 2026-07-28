const express = require('express');
const router = express.Router();
const multer = require('multer');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// 5MB FIX - CORRECT!
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req,file,cb)=>{
    if(file.mimetype.startsWith('image/')) cb(null,true);
    else cb(new Error('Only images'),false);
  }
});

// GET - public
router.get('/', async (req,res)=>{
  try{
    const jobs = await Job.find().sort({createdAt:-1});
    res.json(jobs);
  }catch(e){ res.status(500).json({msg:e.message}); }
});

// POST - needs login + photo
router.post('/', auth, upload.single('photo'), async (req,res)=>{
  try{
    if(!req.file) return res.status(400).json({msg:'Photo REQUIRED!'});
    const photoUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const job = new Job({
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      budget: Number(req.body.budget),
      photoUrl: photoUrl,
      image: photoUrl,
      customerId: req.user.id,
      customerName: req.user.name,
      customerPhone: req.user.phone
    });
    await job.save();
    res.status(201).json(job);
  }catch(e){ res.status(500).json({msg:e.message}); }
});

// DELETE - owner or old User jobs cleanup
router.delete('/:id', auth, async (req,res)=>{
  try{
    const job = await Job.findById(req.params.id);
    if(!job) return res.status(404).json({msg:'Not found'});
    const isOwner = job.customerId && job.customerId.toString() === req.user.id;
    const isOld = !job.customerId || job.customerName==='User' || job.customerName==='Tersoo kunde' || job.customerName==='test';
    if(!isOwner && !isOld) return res.status(403).json({msg:'Not your job'});
    await Job.findByIdAndDelete(req.params.id);
    res.json({msg:'Deleted'});
  }catch(e){ res.status(500).json({msg:e.message}); }
});

module.exports = router;
