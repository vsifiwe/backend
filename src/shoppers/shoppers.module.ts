import { Module } from '@nestjs/common';
import { ShoppersService } from './shoppers.service';
import { ShoppersController } from './shoppers.controller';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';
import { SellersModule } from 'src/sellers/sellers.module';
  
@Module({
  imports: [ProductsModule, OrdersModule, SellersModule],
  providers: [ShoppersService],
  controllers: [ShoppersController]
})
export class ShoppersModule {}
