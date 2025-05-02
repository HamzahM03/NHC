
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  recordedBy: {
    type: String,
    trim: true
  }
}, { timestamps: true });


const Transaction = mongoose.model('Transaction', transactionSchema);   
export default Transaction;
