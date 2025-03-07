import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now },
    kidsAttended: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kid' }]
});

const Session = mongoose.model('Session', sessionSchema);
export default Session;
