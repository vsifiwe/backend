import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { StoreRepository } from './store.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { ProductsModule } from 'src/products/products.module';
@Module({
  imports: [TypeOrmModule.forFeature([Store]), ProductsModule],
  providers: [SellersService, StoreRepository],
  controllers: [SellersController]
})
export class SellersModule {}
