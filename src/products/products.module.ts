import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductRepository } from './repositories/products.repository';
import { CategoryRepository } from './repositories/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [ProductsService, ProductRepository, CategoryRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
