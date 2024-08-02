// src/controllers/userController.ts

import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getUserByPhoneNumber(req: Request, res: Response): Promise<void> {
    try {
      const phoneNumber = req.params.phoneNumber;
      const user = await this.userService.fetchUserByPhoneNumber(phoneNumber);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
  }
}

export default UserController;
