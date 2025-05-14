import { Injectable } from '@nestjs/common';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';
import { NewOrderDto } from 'src/orders/dto/newOrder.dto';
import { Cart } from 'src/products/entities/cart.entity';
import { Wishlist } from 'src/products/entities/wishlist.entity';
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
        console.log(newOrder);
        return this.ordersService.createOrder(newOrder, userId);
    }

    async getOrdersByShopperId(shopperId: number): Promise<Order[]> {
        return this.ordersService.getOrdersByUserId(shopperId);
    }

    async getCartByUserId(userId: number): Promise<Cart> {
        return this.productsService.getCartByUserId(userId);
    }

    async addProductToCart(userId: number, productId: number, quantity: number): Promise<Cart> {
        return this.productsService.addProductToCart(userId, productId, quantity);
    }

    async removeProductFromCart(userId: number, productId: number): Promise<Cart> {
        return this.productsService.removeProductFromCart(userId, productId);
    }

    async getWishlistByUserId(userId: number): Promise<Wishlist[]> {
        return this.productsService.getWishlistByUserId(userId);
    }

    async addProductToWishlist(userId: number, productId: number): Promise<Wishlist> {
        return this.productsService.addProductToWishlist(userId, productId);
    }

    async removeProductFromWishlist(userId: number, productId: number): Promise<Wishlist[]> {
        return this.productsService.removeProductFromWishlist(userId, productId);
    }
}
