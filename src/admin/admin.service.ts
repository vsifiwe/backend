import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { ProductsService } from "src/products/products.service";
import { StoreRepository } from "src/sellers/store.repository";


@Injectable()
export class AdminService {
    constructor(
        private readonly usersService: UsersService, 
        private readonly productsService: ProductsService,
        private readonly storeRepository: StoreRepository,
    ) { }

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

    async getCategories() {
        return this.productsService.getCategories();
    }

    async getStores() {
        return this.storeRepository.findAll();
    }

    async getProducts() {
        return this.productsService.getAllProducts();
    }
}