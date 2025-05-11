import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async create(data: Partial<Order>): Promise<Order> {
    const order = this.repository.create(data);
    return this.repository.save(order);
  }

  async findById(id: number): Promise<Order | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Order>): Promise<Order | null> {
    await this.repository.update({ id }, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async findAllByStoreId(storeId: number): Promise<Order[]> {
    return this.repository.find({ where: { items: { product: { store: { id: storeId } } } } });
  }

  async findAllByUserId(userId: number): Promise<Order[]> {
    return this.repository.find({ where: { user: { id: userId } } });
  }
}
