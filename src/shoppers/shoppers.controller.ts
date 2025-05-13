import { Controller, Get, Param, Post, Req, UseGuards, Body } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Product } from 'src/products/entities/product.entity';
import { ShoppersService } from './shoppers.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Order } from 'src/orders/entities/order.entity';
import { NewOrderDto } from 'src/orders/dto/newOrder.dto';

@Controller('shoppers')
export class ShoppersController {
    constructor(private readonly shoppersService: ShoppersService) {}

    @Get()
    async getProducts(@Req() req): Promise<Product[]> {
        return this.shoppersService.getProducts();
    }

    @UseGuards(JwtAuthGuard, RolesGuard )
    @Roles('user')
    @Post('orders')
    async createOrder(@Req() req, @Body() newOrder: NewOrderDto): Promise<Order> {
        return this.shoppersService.createOrder(newOrder, req.user.id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard )
    @Roles('user')
    @Get('orders')
    async getOrders(@Req() req): Promise<Order[]> {
        return this.shoppersService.getOrdersByShopperId(req.user.id);
    }

    @Get(':id')
    async getProductById(@Param('id') id: number): Promise<Product> {
        return this.shoppersService.getProductById(id);
    }
}
