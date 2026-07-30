const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema({
  escrowId: String,
  jobId: String,
  jobTitle: String,
  clientId: String,
  clientName: String,
  artisanId: String,
  artisanName: String,
  messages: [{
    senderId: String,
    senderName: String,
    text: String,
    time: { type: Date, default: Date.now },
    isPhoneAttempt: Boolean // detects if user tried to share phone
  }],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Chat', ChatSchema);
