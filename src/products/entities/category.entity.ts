import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Product } from "../../products/entities/product.entity";
import { Store } from "src/sellers/entities/store.entity";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

    @ManyToOne(() => Store, (store) => store.categories)
    store: Store;

}