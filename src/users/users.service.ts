import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) { }

  async create(user: User) {
    return this.usersRepository.create(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findByEmail(email);
  }

  async verifyEmail(id: number) {
    return this.usersRepository.verifyEmail(id);
  }

  async findById(id: number) {
    return this.usersRepository.findById(id);
  }
}
