const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  clientIp: { type: String, required: false },
  clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model('URL', urlSchema);
