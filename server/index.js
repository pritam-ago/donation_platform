import cors from "cors";
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import causeRoutes from './routes/causeRoutes.js';
import userRoutes from './routes/userRoutes.js';

const corsOptions = {
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

dotenv.config();
const port = 5555;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/', causeRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello world');
});
app.listen(port, () => console.log(`Server running on port ${port}`));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
  })
  .catch((err) => console.error('Database connection error:', err));