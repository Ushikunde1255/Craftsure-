const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  location: { type: String, default: 'Makurdi, Benue' },
  category: { type: String, default: 'Plumbing' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String },
  status: { type: String, default: 'open' }
}, { timestamps: true });

module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);
