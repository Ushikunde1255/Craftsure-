const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  category: {
    type: String,
    required: true,
    enum: ['tailoring', 'carpentry', 'plumbing', 'electrical', 'painting', 'welding', 'hairdressing', 'makeup', 'photography', 'catering', 'other']
  },
  budget: {
    type: Number,
    required: true,
    min: 500
  },
  location: {
    type: String,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  artisan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  status: {
    type: String,
    enum: ['open', 'assigned', 'in_progress', 'completed', 'cancelled', 'disputed'],
    default: 'open'
  },
  deadline: {
    type: Date
  },
  images: [{
    type: String
  }],
  proofs: [{
    url: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  paymentStatus: {
    type: String,
    enum: ['pending', 'escrow', 'released', 'refunded'],
    default: 'pending'
  },
  paystackRef: {
    type: String
  }
}, { timestamps: true });

// Index for search
JobSchema.index({ title: 'text', description: 'text', category: 1 });

module.exports = mongoose.model('Job', JobSchema);
