// src/routes/userRoutes.ts

import express from 'express';
import UserController from '../../controllers/userController';

const router = express.Router();
const userController = new UserController();

// Route to fetch user by phone number
router.get('/phone/:phoneNumber', userController.getUserByPhoneNumber.bind(userController));

export default router;
