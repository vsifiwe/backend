import { Injectable, BadRequestException } from '@nestjs/common';
import { Store } from './entities/store.entity';
import { StoreRepository } from './store.repository';
type StoreInput = Omit<Store, 'id' | 'createdAt' | 'updatedAt' | 'user'>;

@Injectable()
export class SellersService {
    constructor(
        private readonly storeRepository: StoreRepository,
    ) { }

    async createStore(store: StoreInput) {
        
        const existingStore = await this.storeRepository.findStoreByUserId(store.userId);
        if (existingStore) {
            throw new BadRequestException('User already has a store');
        }
        const createdStore = this.storeRepository.create(store);
        return createdStore;
    }

    async getStore(userId: number) {
        return this.storeRepository.findStoreByUserId(userId);
    }

    async getStoreByUserId(userId: number) {
        return this.storeRepository.findStoreByUserId(userId);
    }
    
}

