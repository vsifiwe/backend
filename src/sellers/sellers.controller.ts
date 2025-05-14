import {
  Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateStoreDto } from './dto/createStore.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { SellersService } from './sellers.service';
import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('seller')
@Controller('sellers')
export class SellersController {
  constructor(
    private readonly sellersService: SellersService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
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
      categories: [],
    }
    return this.sellersService.createStore(store);
  }

  @Get('store')
  getStore(@Req() req) {
    return this.sellersService.getStore(req.user.id);
  }

  @Patch('store')
  updateStore(@Req() req, @Body() dto: any) {
    // return this.sellersService.updateStore(req.user.userId, dto);
  }

  @Get('products')
  async listProducts(@Req() req) {
    const store = await this.sellersService.getStoreByUserId(req.user.id);
    return this.productsService.listProductsByStoreId(store.id);
  }

  @Post('products')
  async createProduct(@Req() req, @Body() dto: CreateProductDto) {
    const store = await this.sellersService.getStoreByUserId(req.user.id);
    const category = await this.productsService.getCategoryById(dto.categoryId);
    const product = {
      ...dto,
      store: store,
      category: category,
      cartItems: [],
      wishlists: [],
    }
    return this.productsService.createProduct(product);
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
  // @Roles('seller')
  async listOrders(@Req() req) {
    const store = await this.sellersService.getStoreByUserId(req.user.id);
    return this.ordersService.getOrdersByStoreId(store.id);
  }

  @Patch('orders/:id/status')
  updateOrderStatus(@Req() req, @Param('id') id: string, @Body('status') status: string) {
    // return this.ordersService.updateOrderStatus(req.user.userId, id, status);
  }

  @Post('categories')
  async createCategory(@Req() req, @Body() dto: CreateCategoryDto) {
    const store = await this.sellersService.getStoreByUserId(req.user.id);
    return this.productsService.createCategory({
      ...dto,
      store: store,
    });
  }

  @Get('categories')
  async listCategories(@Req() req) {
    const store = await this.sellersService.getStoreByUserId(req.user.id);
    return this.productsService.listCategoriesByStoreId(store.id);
  }
}
