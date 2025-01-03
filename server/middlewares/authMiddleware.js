import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token);
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);

      req.user = await User.findById(decoded.userId).select('-password'); 
      console.log('User from DB:', req.user);
      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    console.log('No token provided');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
