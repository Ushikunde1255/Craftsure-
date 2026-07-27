const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  location: String,
  category: String,
  image: String,
  photoUrl: String,     
  photoId: String,       
  postedBy: String,
  customerName: String,
  postedBySkill: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
