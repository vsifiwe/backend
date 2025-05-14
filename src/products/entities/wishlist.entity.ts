import { User } from "src/users/entities/user.entity";
import { Product } from "./product.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.wishlists)
    user: User;

    @ManyToOne(() => Product, product => product.wishlists)
    product: Product;
}