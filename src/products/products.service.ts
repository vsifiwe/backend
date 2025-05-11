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

    async listProductsByStoreId(storeId: number): Promise<Product[]> {
        return this.productRepository.findProductByStoreId(storeId);
    }

    async createCategory(category: CategoryInput): Promise<Category> {
        return this.categoryRepository.create(category);
    }

    async listCategoriesByStoreId(storeId: number): Promise<Category[]> {
        return this.categoryRepository.findCategoryByStoreId(storeId);
    }

    async getCategoryById(id: number): Promise<Category> {
        return this.categoryRepository.findById(id);
    }

    async getProductById(id: number): Promise<Product> {
        return this.productRepository.findById(id);
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.findAll();
    }
    
}
