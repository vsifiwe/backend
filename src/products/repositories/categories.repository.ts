import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(data: Partial<Category>): Promise<Category> {
    const category = this.repository.create(data);
    return this.repository.save(category);
  }

  async findById(id: number): Promise<Category | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Category>): Promise<Category | null> {
    await this.repository.update({ id }, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  async findCategoryByStoreId(storeId: number): Promise<Category[]> {
    return this.repository.find({ where: { store: { id: storeId } } });
  }
}
