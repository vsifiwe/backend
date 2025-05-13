import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";


@Injectable()
export class AdminService {
    constructor(
        private readonly usersService: UsersService, 
        private readonly jwtService: JwtService) { }

    async getSellers() {
        return this.usersService.findAllWhere({ role: 'seller' });
    }

    async getSellerApplications() {
        return this.usersService.findAllWhere({ role: 'user', isApplied: true });
    }

    async approveSeller(id: number) {
        const user = await this.usersService.findById(id);
        if (!user) throw new NotFoundException('User not found');
        return this.usersService.changeRole(id, 'seller');
    }

    async rejectSeller(id: number) {
        const user = await this.usersService.findById(id);
        if (!user) throw new NotFoundException('User not found');
        return this.usersService.changeIsApplied(id, false);
    }
}