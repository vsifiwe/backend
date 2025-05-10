import { Controller, Get, Param, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('sellers')
    getSellers() {
        return this.adminService.getSellers();
    }

    @Patch('sellers/:id/approve')
    approveSeller(@Param('id') id: number) {
        return this.adminService.approveSeller(id);
    }

    @Patch('sellers/:id/reject')
    rejectSeller(@Param('id') id: number) {
        return this.adminService.rejectSeller(id);
    }

    // Products
}
