const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now },
    kidsAttended: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kid' }]
});

module.exports = mongoose.model('Session', sessionSchema);
