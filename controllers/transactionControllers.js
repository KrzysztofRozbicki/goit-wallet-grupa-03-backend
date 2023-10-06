import Transaction from '../service/schemas/transactions.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import moment from 'moment';

export const getAllCategories = async (req, res) => {
  try {
  } catch (err) {}
};

export const filterTransactions = async (req, res) => {
  try {
  } catch (err) {}
};

export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createTransaction = async (req, res) => {
  const { amount, category, date, isIncome, comment } = req.body;

  if (!date || isIncome === undefined)
    return res.status(400).json({ error: 'Please enter all required information' });

  if (isIncome) delete req.body.category;

  if (amount <= 0) return res.status(400).json({ error: 'The amount must be greather than zero' });

  function convertToDDMMYYYY(dateString) {
    const formats = [
      'YYYY-MM-DD',
      'MM/DD/YYYY',
      'D MMMM YYYY',
      'YYYY/MM/DD',
      'MMMM D, YYYY',
      'D MMMM YYYY',
      'DD MMM, YYYY',
      'YYYY, MMM DD',
      'DD/MM/YY',
      'DD/MM/YYYY',
      'MMMM DD, YYYY',
      'DD MMMM YYYY',
      'YYYY/MM/DD',
      'DD.MM.YYYY',
      'DD-MM-YYYY',
    ];

    const date = moment(dateString, formats, true);
    return date.isValid() ? date.format('DD-MM-YYYY') : 'Invalid date';
  }
  const correctDate = convertToDDMMYYYY(date);
  if (correctDate === 'Invalid date') return res.status(400).json({ error: 'Invalid date format' });

  const finalCategory = isIncome ? 'Income' : category;
  const validCategories = [
    'Income',
    'Main expenses',
    'Products',
    'Car',
    'Self care',
    'Child care',
    'Household products',
    'Education',
    'Leisure',
    'Entertainment',
    'Other expenses',
  ];

  if (!validCategories.includes(finalCategory)) {
    return res
      .status(400)
      .json({ error: 'Invalid category provided. Please enter the correct category.' });
  }

  try {
    const transaction = await Transaction.create({
      user: req.user._id,
      amount,
      category: finalCategory,
      date: correctDate,
      isIncome,
      comment,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid transaction ID format' });
  }

  try {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction was not found or already deleted' });
    }

    if (transaction.user && transaction.user.toString() !== req.user._id.toString()) {
      console.log('Not authorized'); // Log to see if this block is executed
      return res.status(401).json({ error: 'Not authorized' });
    }

    await Transaction.deleteOne({ _id: id });

    res.json({ message: 'Transaction removed!' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    let transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (!transaction.user.equals(req.user._id)) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    if (req.body.date) {
      req.body.date = convertToDDMMYYYY(req.body.date);
      if (req.body.date === 'Invalid date') {
        return res.status(400).json({ error: 'Invalid date format' });
      }
    }

    if (req.body.category && !validCategories.includes(req.body.category)) {
      return res
        .status(400)
        .json({ error: 'Invalid category provided. Please enter the correct category.' });
    }

    transaction = await Transaction.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server Error' });
  }
};
