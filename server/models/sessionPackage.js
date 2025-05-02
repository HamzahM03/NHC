import mongoose from 'mongoose';

const sessionPackageSchema = new mongoose.Schema({
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
  packageSize: { type: Number, enum: [1, 4, 8], required: true },
  purchaseDate: { type: Date, default: Date.now },
  sessionsUsed: { type: Number, default: 0 },
  paymentMethod: { type: String, enum: ['zelle', 'cash'], required: true },
  registeredBy: { type: String, trim: true },
}, { timestamps: true });


const SessionPackage = mongoose.model('SessionPackage', sessionPackageSchema);
export default SessionPackage;
