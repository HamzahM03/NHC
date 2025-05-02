import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
  date: { type: Date, default: Date.now },
  sessionType: { type: String, enum: ['group', 'private'], required: true },
  checkedInBy: { type: String, trim: true },
  notes: { type: String, trim: true },
}, { timestamps: true });


const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;

