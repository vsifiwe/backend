import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from 'src/products/products.module';
import { SellersModule } from 'src/sellers/sellers.module';

@Module({
  imports: [UsersModule, JwtModule, ProductsModule, SellersModule],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
