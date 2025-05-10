import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    await this.repository.update({ id }, data);
    return this.findById(id);
  }

  async verifyEmail(id: number): Promise<User | null> {
    return this.update(id, { isVerified: true });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
