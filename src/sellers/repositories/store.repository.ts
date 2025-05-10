import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectRepository(Store)
    private readonly repository: Repository<Store>,
  ) {}

  async create(data: Partial<Store>): Promise<Store> {
    const store = this.repository.create(data);
    return this.repository.save(store);
  }

  async findById(id: number): Promise<Store | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Store>): Promise<Store | null> {
    await this.repository.update({ id }, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async findAll(): Promise<Store[]> {
    return this.repository.find();
  }

  async findStoreByUserId(userId: number): Promise<Store | null> {
    return this.repository.findOne({ where: { userId } });
  }
}
