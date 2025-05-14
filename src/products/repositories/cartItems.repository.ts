import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entities/cartItem.entity';
import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';

type CartItemCreateInput = {
    cart: Pick<Cart, 'id'>;
    product: Pick<Product, 'id'>;
    quantity: number;
    price: number;
};

@Injectable()
export class CartItemRepository {
  constructor(
    @InjectRepository(CartItem)
    private readonly repository: Repository<CartItem>,
  ) {}

  async create(data: CartItemCreateInput): Promise<CartItem> {
    const cartItem = this.repository.create({
      ...data,
      cart: { id: data.cart.id } as Cart,
      product: { id: data.product.id } as Product
    });
    return this.repository.save(cartItem);
  }

  async findByCartId(cartId: number): Promise<CartItem[]> {
    return this.repository.find({
      where: { cart: { id: cartId } },
      relations: ['product']
    });
  }

  async delete(cartId: number, productId: number): Promise<void> {
    await this.repository.delete({ cart: { id: cartId }, product: { id: productId } });
  }

  async update(id: number, data: Partial<CartItem>): Promise<CartItem | null> {
    await this.repository.update({ id }, data);
    return this.repository.findOne({ where: { id } });
  }

  async findByCartAndProduct(cartId: number, productId: number): Promise<CartItem | null> {
    return this.repository.findOne({
      where: {
        cart: { id: cartId },
        product: { id: productId }
      }
    });
  }

  async updateQuantity(id: number, quantity: number): Promise<CartItem | null> {
    await this.repository.update({ id }, { quantity });
    return this.repository.findOne({ where: { id } });
  }
} 