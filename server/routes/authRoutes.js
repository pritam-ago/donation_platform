import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, username, password, address, phoneNumber } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      address,
      phoneNumber,
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error 111' });
  }
});

router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password.trim());
    console.log('Is password match?', isMatch); 

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const payload = {
      userId: user._id,
      username: user.username,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
