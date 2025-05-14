
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wishlist } from "../entities/wishlist.entity";
import { User } from "src/users/entities/user.entity";
import { Product } from "../entities/product.entity";

@Injectable()
export class WishlistRepository {
    constructor(
        @InjectRepository(Wishlist)
        private readonly repository: Repository<Wishlist>,
    ) {}

    async create(data: Wishlist): Promise<Wishlist> {
        // check if product already in wishlist
        const existingWishlist = await this.repository.findOne({ where: { user: { id: data.user.id }, product: { id: data.product.id } } });
        if (existingWishlist) {
            throw new BadRequestException('Product already in wishlist');
        }
        return this.repository.save(data);
    }

    async findByUserId(userId: number): Promise<Wishlist[]> {
        return this.repository.find({ where: { user: { id: userId } } });
    }

    async delete(userId: number, productId: number): Promise<void> {
        await this.repository.delete({ user: { id: userId }, product: { id: productId } });
    }   
    async removeProductFromWishlist(userId: number, productId: number): Promise<Wishlist[]> {
        await this.delete(userId, productId);
        return this.findByUserId(userId);
    }
}
