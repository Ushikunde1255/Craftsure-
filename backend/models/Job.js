const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  budget: { type: Number, required: true },
  photoUrl: { type: String, required: true },
  image: { type: String },
  customerName: { type: String, required: true },
  customerPhone: { type: String },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerEmail: { type: String },
  status: { type: String, enum: ['open', 'in-progress', 'completed'], default: 'open' },
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
