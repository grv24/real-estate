import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Using the userRouter
app.use('/api/users', userRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
