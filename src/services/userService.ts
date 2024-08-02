// src/services/userService.ts

import GetUserByPhoneNumber from '../usecases/getUserByPhoneNumber';
import UserRepository from '../repositories/userRepository';
import { IUser } from '../entities/user';

class UserService {
  private userRepository: UserRepository;
  private getUserByPhoneNumber: GetUserByPhoneNumber;

  constructor() {
    this.userRepository = new UserRepository();
    this.getUserByPhoneNumber = new GetUserByPhoneNumber(this.userRepository);
  }

  public async fetchUserByPhoneNumber(phoneNumber: string): Promise<IUser | null> {
    return this.getUserByPhoneNumber.execute(phoneNumber);
  }
}

export default UserService;
