import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { Store } from "../../sellers/entities/store.entity";
import { Category } from "./category.entity";
import { CartItem } from "./cartItem.entity";
import { Wishlist } from "./wishlist.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    price: number;

    @Column()
    salePrice: number;

    @ManyToOne(() => Store, (store) => store.products)
    store: Store;

    @Column({ type: 'jsonb', default: [] })
    images: string[];

    @Column({ default: 0 })
    reviewCount: number;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @OneToMany(() => CartItem, item => item.product)
    cartItems: CartItem[];

    @OneToMany(() => Wishlist, wishlist => wishlist.product)
    wishlists: Wishlist[];
}