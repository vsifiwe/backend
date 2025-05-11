import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { NewOrderDto } from './dto/newOrder.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Order } from './entities/order.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles('user')
    async createOrder(
        @Body() newOrder: NewOrderDto,
        @Request() req
    ): Promise<Order> {
        return this.ordersService.createOrder(newOrder, req.user.id);
    }
}
