const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  urlId: { type: mongoose.Schema.Types.ObjectId, ref: 'URL', required: true },
  clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model('Statistics', statisticsSchema);
