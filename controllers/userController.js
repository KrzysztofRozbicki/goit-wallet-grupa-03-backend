import bcrypt from 'bcryptjs';
import User from '../service/schemas/users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

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

    res.status(201).json({ message: `User '${name}' registered successfully` });
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

    const payload = {
      id: user.id,
      username: user.email,
    };

    const newRefreshToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '5h',
    });

    user.refreshToken = newRefreshToken;

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });

    user.token = token;
    await user.save();

    res.status(200).json({
      message: 'Login successful',
      token: token,
      refreshToken: newRefreshToken,
      user: { email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, email } = user;

    res.status(200).json({ name, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Get user profile failed' });
  }
};

export const refreshTokens = async (req, res) => {
  try {
  } catch (error) {}
};

export const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.token = null;
    await user.save();
    const { name } = user;

    res.status(200).json({ message: `Logout ${name} successful` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Logout failed' });
  }
};
