import {register , login, logout, getUser} from '../../controllers/authControlller.js';
import express from 'express';
import { authMiddleware } from '../../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register' , register);
router.post('/login' , login);
router.get('/logout' , logout);
router.get('/me', authMiddleware , getUser);

export default router;