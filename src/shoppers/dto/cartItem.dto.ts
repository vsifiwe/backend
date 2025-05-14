import { IsArray, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CartItemDto {
    @IsNotEmpty()
    productId: number;

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    quantity: number;
}