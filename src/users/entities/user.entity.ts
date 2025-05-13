import { Order } from 'src/orders/entities/order.entity';
import { Store } from 'src/sellers/entities/store.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToOne, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: false })
  isApplied: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}