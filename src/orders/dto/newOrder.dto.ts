import { IsArray, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

type OrderItem = {
    productId: number;
    quantity: number;
}

export class NewOrderDto {
    @IsArray()
    @IsNotEmpty()
    items: OrderItem[];

    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}