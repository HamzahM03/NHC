import mongoose from 'mongoose';

const kidSchema = new mongoose.Schema({
    name: { type: String, required: true },
    parentName: { type: String },
    sessionsRemaining: { type: Number, default: 0 }, // Tracks package usage
    paymentType: { type: String, enum: ['cash', 'zelle'] },
    history: [
        {
            sessionDate: { type: Date, default: Date.now },
            paymentType: { type: String },
            usedPackage: { type: Boolean, default: false }
        }
    ]
});

const Kid = mongoose.model('Kid', kidSchema);
export default Kid;
