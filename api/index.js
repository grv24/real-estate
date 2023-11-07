import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/auth',authRouter)


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
