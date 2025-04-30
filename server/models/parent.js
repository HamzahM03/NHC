const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contact: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  address: { type: String, trim: true },
  emergencyContactName: { type: String, required: true, trim: true },
  emergencyContact: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Parent', parentSchema);
