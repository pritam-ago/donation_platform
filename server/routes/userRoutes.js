import express from 'express';
import User from '../models/User.js';
import { protect } from "../middlewares/authMiddleware.js";
import Cause from '../models/Cause.js';

const router = express.Router();

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("donatedTo raisedCauses");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      name: user.name,
      username: user.username,
      email: user.email,
      totalDonatedAmount: user.totalDonatedAmount,
      donatedTo: user.donatedTo,
      raisedCauses: user.raisedCauses,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/donations', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('donatedTo');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const donations = Array.isArray(user.donatedTo)
      ? user.donatedTo.map(cause => ({
          _id: cause._id,
          title: cause.title || 'Untitled Cause',
          description: cause.description || 'No description available.',
          amountDonated: cause.donatedAmount || 0, 
          date: cause.createdAt || new Date(), 
        }))
      : [];
    res.json({
      name: user.name,
      donations,
    });
  } catch (err) {
    console.error('Error fetching donations:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().populate('donatedTo'); 
    const leaderboard = users.map(user => {
      const totalDonated = user.donatedTo.reduce((sum, cause) => sum + cause.donatedAmount, 0);
      return { name: user.name, totalDonated, _id: user._id };
    });

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
});

export default router;
