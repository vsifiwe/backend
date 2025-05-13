import { IsEmail, IsNotEmpty } from 'class-validator';

export class ApplySellerDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}