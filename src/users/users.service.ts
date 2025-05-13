import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { FindOptionsWhere } from 'typeorm';

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

  async findAllWhere(options: FindOptionsWhere<User>) {
    return this.usersRepository.findAllWhere(options);
  }

  async changeRole(id: number, role: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.role = role;
    return this.usersRepository.update(id, user);
  }
}
