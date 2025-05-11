import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
import { ProductsModule } from 'src/products/products.module';
@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), ProductsModule],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
