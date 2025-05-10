import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/products.repository';
import { CategoryRepository } from './repositories/categories.repository';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';

type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'store' | 'category' | 'reviewCount'>;
type CategoryInput = Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'products'>;

@Injectable()
export class ProductsService {

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async createProduct(product: ProductInput): Promise<Product> {
        return this.productRepository.create(product);
    }

    async getProducts(storeId: number): Promise<Product[]> {
        return this.productRepository.findProductByStoreId(storeId);
    }

    async createCategory(category: CategoryInput): Promise<Category> {
        return this.categoryRepository.create(category);
    }

    async getCategories(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }

    async getCategoryById(id: number): Promise<Category> {
        return this.categoryRepository.findById(id);
    }
    
    
}
