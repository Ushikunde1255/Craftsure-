const mongoose = require('mongoose');
const portfolioSchema = new mongoose.Schema({
  artisan: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  artisanName: String,
  title: { type: String, required: true },
  category: String,
  location: String,
  description: String,
  photoUrl: String,
}, { timestamps: true });
module.exports = mongoose.model('Portfolio', portfolioSchema);
