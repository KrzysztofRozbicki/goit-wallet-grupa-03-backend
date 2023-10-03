import mongoose from 'mongoose';

const { Schema } = mongoose;

const transaction = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  amount: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  isIncome: {
    type: Boolean,
    required: true,
    default: false,
  },

  comment: {
    type: String,
    required: false,
  },
});

const Transaction = mongoose.model('transaction', transaction);

export default Transaction;
