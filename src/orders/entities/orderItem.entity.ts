import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne
  } from 'typeorm';
  import { Order } from './order.entity';
  import { Product } from 'src/products/entities/product.entity';
  
  @Entity()
  export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
    order: Order;
  
    @ManyToOne(() => Product, { eager: true })
    product: Product;
  
    @Column('int')
    quantity: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    priceAtPurchase: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    subtotal: number;
  }
  