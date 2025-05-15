import { Controller, Get, Param, Post, Req, UseGuards, Body, Delete } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Product } from 'src/products/entities/product.entity';
import { ShoppersService } from './shoppers.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Order } from 'src/orders/entities/order.entity';
import { NewOrderDto } from 'src/orders/dto/newOrder.dto';
import { Cart } from 'src/products/entities/cart.entity';
import { CartItemDto } from './dto/cartItem.dto';
import { Wishlist } from 'src/products/entities/wishlist.entity';
import { SellersService } from 'src/sellers/sellers.service';
import { Store } from 'src/sellers/entities/store.entity';

@Controller('shoppers')
export class ShoppersController {
    constructor(
        private readonly shoppersService: ShoppersService,
        private readonly sellersService: SellersService
    ) { }

    @Get()
    async getProducts(@Req() req): Promise<Product[]> {
        return this.shoppersService.getProducts();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Post('orders')
    async createOrder(@Req() req, @Body() newOrder: NewOrderDto): Promise<Order> {
        console.log(newOrder);
        return this.shoppersService.createOrder(newOrder, req.user.id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Get('orders')
    async getOrders(@Req() req): Promise<Order[]> {
        return this.shoppersService.getOrdersByShopperId(req.user.id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Get('cart')
    async getCart(@Req() req): Promise<Cart & { total: number }> {
        const cart = await this.shoppersService.getCartByUserId(req.user.id);
        let total = 0;
        let products = [];
        cart.items.forEach(item => {
            total += item.price * item.quantity;
        });

        return { ...cart, total: total };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Post('cart')
    async addProductToCart(@Req() req, @Body() dto: CartItemDto): Promise<Cart> {
        return this.shoppersService.addProductToCart(req.user.id, dto.productId, dto.quantity);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Delete('cart/:productId')
    async removeProductFromCart(@Req() req, @Param('productId') productId: number): Promise<Cart> {
        console.log(req.user.id, productId);
        return this.shoppersService.removeProductFromCart(req.user.id, productId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Get('wishlist')
    async getWishlist(@Req() req): Promise<Wishlist[]> {
        return this.shoppersService.getWishlistByUserId(req.user.id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Post('wishlist')
    async addProductToWishlist(@Req() req, @Body() dto: { productId: number }): Promise<Wishlist> {
        return this.shoppersService.addProductToWishlist(req.user.id, dto.productId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Delete('wishlist/:productId')
    async removeProductFromWishlist(@Req() req, @Param('productId') productId: number): Promise<Wishlist[]> {
        console.log(req.user.id, productId);
        return this.shoppersService.removeProductFromWishlist(req.user.id, productId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Get('stores')
    async getStores(@Req() req): Promise<Store[]> {
        return this.sellersService.getStores();
    }

    @Get(':id')
    async getProductById(@Param('id') id: number): Promise<Product> {
        return this.shoppersService.getProductById(id);
    }
}
