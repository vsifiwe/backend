import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from "typeorm";
import { Store } from "./store.entity";
import { Category } from "./category.entity";

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
    
}