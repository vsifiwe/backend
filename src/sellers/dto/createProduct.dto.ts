// create product dto
import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    description: string;
    @IsNumber()
    @IsNotEmpty()
    price: number;
    @IsNumber()
    salePrice: number;
    @IsNumber()
    categoryId: number;
    @IsArray()
    images: string[];
}