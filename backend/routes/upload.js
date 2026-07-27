const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Use memory storage, upload buffer to cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No image file' });

    // Upload to cloudinary from buffer
    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'craftsure_jobs' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await uploadStream();
    res.json({ url: result.secure_url, public_id: result.public_id });

  } catch (err) {
    console.log('Upload error:', err.message);
    res.status(500).json({ msg: 'Upload failed: ' + err.message });
  }
});

module.exports = router;
