import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { StoreRepository } from './store.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [TypeOrmModule.forFeature([Store]), ProductsModule, OrdersModule, UsersModule],
  providers: [SellersService, StoreRepository],
  controllers: [SellersController],
  exports: [SellersService, StoreRepository],
})
export class SellersModule {}
