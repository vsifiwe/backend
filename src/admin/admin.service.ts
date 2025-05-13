import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";


@Injectable()
export class AdminService {
    constructor(
        private readonly usersService: UsersService, 
        private readonly jwtService: JwtService) { }

    async getSellers() {
        const sellers = await this.usersService.findAllWhere({ role: 'seller' });
        return sellers.map(seller => {
            delete seller.password;
            delete seller.createdAt;
            delete seller.updatedAt;
            return seller;
        });
    }

    async getUsers() {
        const users = await this.usersService.findAll();
        return users.map(user => {
            delete user.password;
            delete user.createdAt;
            delete user.updatedAt;
            return user;
        });
    }

    async getSellerApplications() {
        const users = await this.usersService.findAllWhere({ role: 'user', isApplied: true });
        return users.map(user => {
            delete user.password;
            delete user.updatedAt;
            return user;
        });
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