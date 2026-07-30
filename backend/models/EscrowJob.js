const mongoose = require('mongoose');

const escrowJobSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  jobTitle: String,
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clientName: String,
  artisanId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  artisanName: String,
  artisanPhone: String,

  // MONEY - YOUR IDEA WITH CRAFTSURE PERCENT!
  artisanPrice: Number, // e.g. 100000 - what client agreed
  clientFeePercent: { type: Number, default: 5 }, // 5% from client
  artisanFeePercent: { type: Number, default: 10 }, // 10% from artisan
  clientFee: Number, // 5000
  artisanFee: Number, // 10000
  totalPaidByClient: Number, // 105000
  totalReceivedByArtisan: Number, // 90000
  craftsureProfit: Number, // 15000 - YOUR MONEY!

  // Milestones - 35% 75% 100% with photo evidence
  m35: {
    percent: { type: Number, default: 35 },
    craftsureAmount: Number, // 35% of profit
    artisanAmount: Number, // 35% of 90k = 31500
    evidencePhotos: [String],
    status: { type: String, enum:['pending','uploaded','approved','paid'], default:'pending' },
    uploadedAt: Date,
    approvedAt: Date
  },
  m75: {
    percent: { type: Number, default: 40 },
    craftsureAmount: Number,
    artisanAmount: Number,
    evidencePhotos: [String],
    status: { type: String, enum:['pending','uploaded','approved','paid'], default:'pending' },
    uploadedAt: Date,
    approvedAt: Date
  },
  m100: {
    percent: { type: Number, default: 25 },
    craftsureAmount: Number,
    artisanAmount: Number,
    evidencePhotos: [String],
    status: { type: String, enum:['pending','uploaded','approved','paid'], default:'pending' },
    uploadedAt: Date,
    approvedAt: Date
  },

  paystackRef: String,
  overallStatus: { type: String, default:'funded' }
}, { timestamps: true });

module.exports = mongoose.model('EscrowJob', escrowJobSchema);
