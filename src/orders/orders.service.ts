import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from './entities/order.entity';
import { NewOrderDto } from './dto/newOrder.dto';
import { ProductsService } from 'src/products/products.service';
import { OrderItem } from './entities/orderItem.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {

    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly productsService: ProductsService,
    ) {}

    async createOrder(newOrder: NewOrderDto, userId: number): Promise<Order> {
        const orderItems = await Promise.all(newOrder.items.map(async (item) => {
            const product = await this.productsService.getProductById(item.productId);
            if (!product) {
                throw new Error(`Product with id ${item.productId} not found`);
            }

            const priceAtPurchase = product.price;
            const subtotal = priceAtPurchase * item.quantity;

            const orderItem = new OrderItem();
            orderItem.product = product;
            orderItem.quantity = item.quantity;
            orderItem.priceAtPurchase = priceAtPurchase;
            orderItem.subtotal = subtotal;

            return orderItem;
        }));

        const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

        const order = new Order();
        order.user = { id: userId } as User;
        order.items = orderItems;
        order.total = total;
        order.status = 'pending';

        return this.ordersRepository.create(order);
    }

    async getOrdersByStoreId(storeId: number): Promise<Order[]> {
        return this.ordersRepository.findAllByStoreId(storeId);
    }

    async getOrdersByUserId(userId: number): Promise<Order[]> {
        return this.ordersRepository.findAllByUserId(userId);
    }
}
