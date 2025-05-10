import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  // @IsNotEmpty()
  readonly image: string;

  @IsNotEmpty()
  readonly phone: string;

}