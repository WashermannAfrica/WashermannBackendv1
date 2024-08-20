import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import orderRoutes from './interfaces/http/orderRoutes';
import mongoose from 'mongoose';
import userRoutes from './interfaces/http/userRoutes';

dotenv.config();

const app: Application = express();
const cors = require('cors');

app.use(cors({
  origin: 'https://washermann.com', // Replace with your frontend origin
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(json());
app.use(urlencoded({ extended: true }));

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      process.exit(1);
    }
  };
  
  connectDB();

// Define routes
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

export default app;
