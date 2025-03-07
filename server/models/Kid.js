const mongoose = require('mongoose');

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

module.exports = mongoose.model('Kid', kidSchema);
