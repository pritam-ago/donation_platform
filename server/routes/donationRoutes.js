import express from 'express';
import jwt from 'jsonwebtoken';
import Cause from '../models/Cause';
import Donation from '../models/Donation';
import User from '../models/User'; // Assuming you have a User model
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Secret key for JWT verification (should be stored securely, not hardcoded)
const jwtSecret = process.env.JWT_SECRET; // This should be in an environment variable, not hardcoded

// POST /donate - Handle donation requests
router.post('/donate', async (req, res) => {
  const { causeId, amount } = req.body;
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the JWT token and extract userId
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded._id; // Assuming the _id is in the token payload

    // Ensure required fields are provided
    if (!causeId || !amount) {
      return res.status(400).json({ error: 'Missing required fields: causeId, amount' });
    }

    // Create a new donation document
    const donation = new Donation({ user: userId, cause: causeId, amount });
    await donation.save();

    // Find the cause and update it
    const cause = await Cause.findById(causeId);
    if (!cause) {
      return res.status(404).json({ error: 'Cause not found' });
    }

    // Add the donation to the cause's donations array
    cause.donations.push({
      user: userId,
      amount,
      date: donation.date,
    });

    // Update the total amount raised and active status
    await cause.updateAmountRaised();

    // Save the updated cause
    await cause.save();

    // Return a success response with the donation and cause info
    res.status(201).json({ message: 'Donation successful', donation, cause });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
