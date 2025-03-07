import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    kidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kid', required: true },
    amountPaid: { type: Number, required: true },
    paymentType: { type: String, enum: ['cash', 'zelle'], required: true },
    date: { type: Date, default: Date.now },
    sessionsAdded: { type: Number, default: 0 }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
