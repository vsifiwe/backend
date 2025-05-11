import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { OrderItem } from "./orderItem.entity";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToMany(() => OrderItem, item => item.order, { cascade: true, eager: true })
    items: OrderItem[];

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @Column({ default: 'pending' })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}