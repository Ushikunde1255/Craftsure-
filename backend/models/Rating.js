const mongoose = require('mongoose');
const RatingSchema = new mongoose.Schema({
  artisanId: String,
  artisanName: String,
  clientId: String,
  clientName: String,
  escrowId: String,
  jobTitle: String,
  stars: Number, // 1-5
  comment: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Rating', RatingSchema);
