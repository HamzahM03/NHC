const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
  date: { type: Date, default: Date.now },
  sessionType: { type: String, enum: ['group', 'private'], required: true },
  checkedInBy: { type: String, trim: true },
  notes: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
