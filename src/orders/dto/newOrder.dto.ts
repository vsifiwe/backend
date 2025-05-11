import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

type OrderItem = {
    productId: number;
    quantity: number;
}

export class NewOrderDto {
    @IsArray()
    @IsNotEmpty()
    items: OrderItem[];
}