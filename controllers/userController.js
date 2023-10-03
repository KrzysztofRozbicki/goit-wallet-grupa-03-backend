import bcrypt from 'bcryptjs';
import User from '../service/schemas/users.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const refreshTokens = async (req, res) => {
  try {
  } catch (err) {}
};

export const getUserProfile = async (req, res) => {
  try {
  } catch (err) {}
};

export const logoutUser = async (req, res) => {
  try {
  } catch (err) {}
};
