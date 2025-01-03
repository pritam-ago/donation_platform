import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import Cause from '../models/Cause.js';

const router = express.Router();

router.post('/causes', protect, async (req, res) => {
    try {
      const { title, description, targetAmount } = req.body;
      console.log('Authenticated user:', req.user);
  
      const newCause = new Cause({
        title,
        description,
        targetAmount,
        createdBy: req.user._id,
      });
      const savedCause = await newCause.save();
      req.user.raisedCauses.push(savedCause._id);
      await req.user.save();
  
      res.status(201).json(savedCause);


    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error creating cause', error });
    }
  });
router.get('/causes/search', async (req, res) => {
  const { query } = req.query;

  try {
    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const causes = await Cause.find({
      title: { $regex: query, $options: 'i' },
    });

    res.status(200).json(causes);
  } catch (error) {
    console.error('Error fetching causes:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.get('/causes', async (req, res) => {
    try {
      const causes = await Cause.find({ active: true }).populate('createdBy', 'name');
      res.json(causes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching causes', error });
    }
  });

router.get('/causes/:id', async (req, res) => {
    try {
        const cause = await Cause.findById(req.params.id).populate('createdBy', 'name');
        if (!cause) {
        return res.status(404).json({ message: 'Cause not found' });
        }
        res.json(cause);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cause', error });
    }
});

router.get('/emerging-causes', async (req, res) => {
  try {
    const causes = await Cause.find()
      .sort({ createdAt: -1 }) 
      .limit(5); 
    res.json(causes);
  } catch (error) {
    console.error('Error fetching emerging causes:', error);
    res.status(500).json({ message: 'Failed to fetch emerging causes' });
  }
});




export default router;
