const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true }, // For WhatsApp
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'artisan', 'admin'], default: 'customer' },
  location: { type: String, default: 'Makurdi, Benue' },
  // For artisans
  skill: { type: String, default: '' }, // e.g. Carpentry
  experience: { type: String, default: '' },
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 5.0 },
  jobsCompleted: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
