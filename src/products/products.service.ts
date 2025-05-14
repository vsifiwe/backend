import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './repositories/products.repository';
import { CategoryRepository } from './repositories/categories.repository';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { CartRepository } from './repositories/carts.repository';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';
import { User } from 'src/users/entities/user.entity';
import { CartItemRepository } from './repositories/cartItems.repository';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistRepository } from './repositories/wishlists.repository';

type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'store' | 'category' | 'reviewCount'>;
type CategoryInput = Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'products'>;

// Add this new type
type CartItemCreateInput = {
    cart: Pick<Cart, 'id'>;
    product: Pick<Product, 'id'>;
    quantity: number;
    price: number;
};

@Injectable()
export class ProductsService {

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository,
        private readonly cartRepository: CartRepository,
        private readonly cartItemRepository: CartItemRepository,
        private readonly wishlistRepository: WishlistRepository,
    ) { }

    async createProduct(product: ProductInput): Promise<Product> {
        return this.productRepository.create(product);
    }

    async listProductsByStoreId(storeId: number): Promise<Product[]> {
        return this.productRepository.findProductByStoreId(storeId);
    }

    async createCategory(category: CategoryInput): Promise<Category> {
        return this.categoryRepository.create(category);
    }

    async listCategoriesByStoreId(storeId: number): Promise<Category[]> {
        return this.categoryRepository.findCategoryByStoreId(storeId);
    }

    async getCategoryById(id: number): Promise<Category> {
        return this.categoryRepository.findById(id);
    }

    async getProductById(id: number): Promise<Product> {
        return this.productRepository.findById(id);
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.findAll();
    }

    async getCategories(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }

    async getCartByUserId(userId: number): Promise<Cart> {
        return this.cartRepository.findByUserId(userId);
    }

    async addProductToCart(userId: number, productId: number, quantity: number): Promise<Cart> {
        let cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            const newCart = new Cart();
            newCart.user = { id: userId } as User;
            cart = await this.cartRepository.create(newCart);
        }

        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // Check if product already exists in cart
        const existingCartItem = await this.cartItemRepository.findByCartAndProduct(cart.id, product.id);

        if (existingCartItem) {
            // Update quantity if product already in cart
            await this.cartItemRepository.updateQuantity(existingCartItem.id, existingCartItem.quantity + quantity);
        } else {
            // Create new cart item if product not in cart
            const cartItemInput: CartItemCreateInput = {
                cart: { id: cart.id },
                product: { id: product.id },
                quantity: quantity,
                price: product.price
            };
            await this.cartItemRepository.create(cartItemInput);
        }

        // Return the cart with its items
        return this.cartRepository.findById(cart.id);
    }

    async removeProductFromCart(userId: number, productId: number): Promise<Cart> {
        const cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        await this.cartItemRepository.delete(cart.id, productId);
        return this.cartRepository.findById(cart.id);
    }

    async getWishlistByUserId(userId: number): Promise<Wishlist[]> {
        return this.wishlistRepository.findByUserId(userId);
    }

    async addProductToWishlist(userId: number, productId: number): Promise<Wishlist> {
        const wishlist = new Wishlist();
        wishlist.user = { id: userId } as User;
        wishlist.product = { id: productId } as Product;
        return this.wishlistRepository.create(wishlist);
    }

    async removeProductFromWishlist(userId: number, productId: number): Promise<Wishlist[]> {
        return this.wishlistRepository.removeProductFromWishlist(userId, productId);
    }

    async clearCart(userId: number): Promise<Cart> {
        const cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        await this.cartItemRepository.deleteAll(cart.id);
        return this.cartRepository.findById(cart.id);
    }
}