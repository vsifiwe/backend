import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(Cart)
    private readonly repository: Repository<Cart>,
  ) {}

  async create(data: Partial<Cart>): Promise<Cart> {
    const cart = this.repository.create(data);
    return this.repository.save(cart);
  }

  async findById(id: number): Promise<Cart | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByUserId(userId: number): Promise<Cart | null> {
    return this.repository.findOne({ where: { user: { id: userId } } });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async findCartProducts(userId: number): Promise<Product[]> {
    const cart = await this.repository.findOne({ where: { user: { id: userId } } });
    if (!cart) {
      return null;
    }
    return cart.items.map(item => {
      return {
        ...item.product,
        quantity: item.quantity,
      };
    });
  }
}