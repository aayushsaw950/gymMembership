import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from './config/db.js';
import { createAdmin } from './utils/scripts.js';
const PORT = process.env.PORT || 3000;
import authRoutes from './routes/adminRouter/authRoutes.js';
import cors from 'cors';
app.use(cors({
  origin: "http://localhost:5173", // tumhara frontend URL
  credentials: true,               // cookies ya auth headers bhejne ke liye
}));

app.use(express.json());
app.use('/api/auth' , authRoutes);




connectDB();
// createAdmin('aayushSaw' , 'aayushgupta1916@gmail.com' , 'aayush@gymProject' );
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
