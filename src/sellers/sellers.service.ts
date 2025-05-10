import { Injectable, BadRequestException } from '@nestjs/common';
import { Store } from './entities/store.entity';
import { StoreRepository } from './repositories/store.repository';

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

    async getStore(id: number) {
        return this.storeRepository.findById(id);
    }
    
}

