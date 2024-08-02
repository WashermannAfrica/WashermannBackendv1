// src/repositories/userRepository.ts

import { User, IUser } from '../entities/user';

interface IUserRepository {
  findByPhoneNumber(phoneNumber: string): Promise<IUser | null>;
}

class UserRepository implements IUserRepository {
  public async findByPhoneNumber(phoneNumber: string): Promise<IUser | null> {
    return User.findOne({ phoneNumber });
  }
}

export default UserRepository;
