
import { Controller, Post, Body, Get, Query, UseGuards, Req, NotFoundException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { SellersService } from 'src/sellers/sellers.service';
import { UsersService } from 'src/users/users.service';
import { ApplySellerDto } from './dto/applySeller.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sellersService: SellersService,
    private usersService: UsersService,
  ) { }

  @Post('register')
  @ApiBody({ type: RegisterDto })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req) {
    const user = await this.authService.getProfile(req.user.sub);

    // if user is seller, and has a store, attach the store to the user
    if (user.role === 'seller') {
      const store = await this.sellersService.getStoreByUserId(user.id);
      return { ...user, store };
    }
    return user;
  }

  @Post('apply')
  @UseGuards(JwtAuthGuard)
  async applyForSeller(@Req() req, @Body() dto: ApplySellerDto) {
    const user = await this.usersService.findById(req.user.id);
    if (!user) throw new NotFoundException('User not found');

    // email must be similar to the email in the request
    if (user.email !== dto.email) throw new BadRequestException('Email does not match');

    // check if user is already applied
    if (user.isApplied) throw new BadRequestException('You have already applied for seller');
    if (user.role === 'seller') throw new BadRequestException('You have already been approved as a seller');

    return this.sellersService.applyForSeller(user.id);
  }
}