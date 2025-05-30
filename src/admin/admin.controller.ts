import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('users')
    getUsers() {
        return this.adminService.getUsers();
    }

    @Get('stores')
    getStores() {
        return this.adminService.getStores();
    }

    @Get('sellers/applications')
    getSellerApplications() {
        return this.adminService.getSellerApplications();
    }

    @Patch('sellers/:id/approve')
    approveSeller(@Param('id') id: number) {
        return this.adminService.approveSeller(id);
    }

    @Patch('sellers/:id/reject')
    rejectSeller(@Param('id') id: number) {
        return this.adminService.rejectSeller(id);
    }

    @Get('categories')
    getCategories() {
        return this.adminService.getCategories();
    }

    @Get('products')
    getProducts() {
        return this.adminService.getProducts();
    }
}
