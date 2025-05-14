import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductRepository } from './repositories/products.repository';
import { CategoryRepository } from './repositories/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';
import { CartRepository } from './repositories/carts.repository';
import { CartItemRepository } from './repositories/cartItems.repository';
import { WishlistRepository } from './repositories/wishlists.repository';
import { Wishlist } from './entities/wishlist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      Cart,
      CartItem,
      Wishlist,
    ]),
  ],
  providers: [
    ProductsService,
    ProductRepository,
    CategoryRepository,
    CartRepository,
    CartItemRepository,
    WishlistRepository,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
