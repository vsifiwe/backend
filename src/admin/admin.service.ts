import { Injectable } from "@nestjs/common";
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

    async approveSeller(id: number) {
        
    }

    async rejectSeller(id: number) {

    }
}