const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  category: { type: String, enum: ['rent', 'equipment', 'other'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, trim: true },
  paidBy: { type: String, trim: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
