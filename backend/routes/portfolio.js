const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', async (req, res) => {
  try {
    const works = await Portfolio.find().sort({ createdAt: -1 });
    res.json(works);
  } catch(e){ res.json([]); }
});

router.post('/', auth, upload.single('photo'), async (req, res) => {
  try {
    if(!req.file) return res.status(400).json({ msg: 'Photo required' });
    const photoUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const work = new Portfolio({
      artisan: req.user.id,
      artisanName: req.user.name,
      title: req.body.title,
      category: req.body.category,
      location: req.body.location,
      description: req.body.description,
      photoUrl
    });
    await work.save();
    res.json(work);
  } catch(e){ res.status(500).json({ msg: e.message }); }
});

module.exports = router;
