// src/usecases/getUserByPhoneNumber.ts

import UserRepository from '../repositories/userRepository';
import { IUser } from '../entities/user';

class GetUserByPhoneNumber {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(phoneNumber: string): Promise<IUser | null> {
    return this.userRepository.findByPhoneNumber(phoneNumber);
  }
}

export default GetUserByPhoneNumber;
