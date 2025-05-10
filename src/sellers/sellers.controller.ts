import {
  Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateStoreDto } from './dto/createStore.dto';
import { SellersService } from './sellers.service';


@UseGuards(JwtAuthGuard)
@Controller('sellers')
export class SellersController {
  constructor(
    private readonly sellersService: SellersService,
    // private readonly productsService: ProductsService,
    // private readonly ordersService: OrdersService,
  ) { }

  // Store Management
  @Post('store')
  createStore(@Req() req, @Body() dto: CreateStoreDto) {
    console.log(req.user);
    const store = {
      ...dto,
      userId: req.user.id,
      reviewCount: 0,
      products: [],
    }
    return this.sellersService.createStore(store);
  }

  @Get('store')
  getStore(@Req() req) {
    // return this.sellersService.getStore(req.user.userId);
  }

  @Patch('store')
  updateStore(@Req() req, @Body() dto: any) {
    // return this.sellersService.updateStore(req.user.userId, dto);
  }

  @Get('products')
  listProducts(@Req() req) {
    // return this.productsService.listSellerProducts(req.user.userId);
  }

  @Post('products')
  createProduct(@Req() req, @Body() dto: any) {
    // return this.productsService.createProduct(req.user.userId, dto);
  }

  @Patch('products/:id')
  updateProduct(@Req() req, @Param('id') id: string, @Body() dto: any) {
    // return this.productsService.updateProduct(req.user.userId, id, dto);
  }

  @Delete('products/:id')
  deleteProduct(@Req() req, @Param('id') id: string) {
    // return this.productsService.deleteProduct(req.user.userId, id);
  }

  @Get('orders')
  listOrders(@Req() req) {
    // return this.ordersService.listStoreOrders(req.user.userId);
  }

  @Patch('orders/:id/status')
  updateOrderStatus(@Req() req, @Param('id') id: string, @Body('status') status: string) {
    // return this.ordersService.updateOrderStatus(req.user.userId, id, status);
  }
}
