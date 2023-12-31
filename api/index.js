import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cors from 'cors'

dotenv.config();


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

const app = express();

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })

})



