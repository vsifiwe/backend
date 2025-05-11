import { Module } from '@nestjs/common';
import { ShoppersService } from './shoppers.service';
import { ShoppersController } from './shoppers.controller';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [ProductsModule, OrdersModule],
  providers: [ShoppersService],
  controllers: [ShoppersController]
})
export class ShoppersModule {}
