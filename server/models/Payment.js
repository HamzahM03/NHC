const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    kidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kid', required: true },
    amountPaid: { type: Number, required: true },
    paymentType: { type: String, enum: ['cash', 'card', 'venmo', 'other'], required: true },
    date: { type: Date, default: Date.now },
    sessionsAdded: { type: Number, default: 0 } // 0 = single session, 4 = package, 8 = package
});

module.exports = mongoose.model('Payment', paymentSchema);
