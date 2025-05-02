import mongoose from 'mongoose';
const participantSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 0 },
  gender: { type: String, enum: ['male', 'female', 'other'], trim: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent', required: true },
  notes: { type: String, trim: true },
}, { timestamps: true });


const Participant = mongoose.model('Participant', participantSchema);
export default Participant;
