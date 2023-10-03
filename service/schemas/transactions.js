import mongoose from 'mongoose';

const { Schema } = mongoose;

const transaction = new Schema({});

const Transaction = mongoose.model('transaction', transaction);

export default Transaction;
