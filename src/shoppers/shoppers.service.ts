import { Injectable } from '@nestjs/common';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';
import { NewOrderDto } from 'src/orders/dto/newOrder.dto';
@Injectable()
export class ShoppersService {

    constructor(
        private readonly productsService: ProductsService,
        private readonly ordersService: OrdersService,
    ) {}

    async getProducts(): Promise<Product[]> {
        return this.productsService.getAllProducts();
    }

    async getProductById(id: number): Promise<Product> {
        return this.productsService.getProductById(id);
    }

    async createOrder(newOrder: NewOrderDto, userId: number): Promise<Order> {
        return this.ordersService.createOrder(newOrder, userId);
    }

    async getOrdersByShopperId(shopperId: number): Promise<Order[]> {
        return this.ordersService.getOrdersByUserId(shopperId);
    }
}
