import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { Product } from './entities/product.entity';

type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'store' | 'category'>;

@Injectable()
export class ProductsService {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    async createProduct(product: ProductInput): Promise<Product> {
        return this.productRepository.create(product);
    }

    async getProducts(storeId: number): Promise<Product[]> {
        return this.productRepository.findProductByStoreId(storeId);
    }
    
    
}
