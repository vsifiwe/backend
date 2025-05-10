import { PrimaryGeneratedColumn, Entity, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Product } from "../../products/entities/product.entity";

@Entity('store')
export class Store {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    phone: string;

    @Column({ unique: true })
    userId: number;

    @Column({ default: 0})
    reviewCount: number;

    @OneToMany(() => Product, (product) => product.store)
    products: Product[];

    @OneToOne(() => User, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}