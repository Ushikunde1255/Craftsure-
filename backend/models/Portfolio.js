const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  artisan: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  artisanName: { 
    type: String 
  },
  title: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String 
  },
  location: { 
    type: String 
  },
  description: { 
    type: String 
  },
  photoUrl: { 
    type: String 
  }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
