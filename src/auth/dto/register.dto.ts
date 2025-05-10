import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the user' })
  readonly name: string;

  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  readonly email: string;

  @MinLength(6)
  @ApiProperty({ description: 'The password of the user' })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The role of the user' })
  readonly role: string;
}