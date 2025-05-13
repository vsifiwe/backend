import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) { }

  async register(dto: RegisterDto) {
    const exists = await this.usersService.findByEmail(dto.email);
    if (exists) throw new BadRequestException('Email already in use');
    const hash = await bcrypt.hash(dto.password, 10);
    const role = 'user';

    const newUser = new User();
    newUser.name = dto.name;
    newUser.email = dto.email;
    newUser.password = hash;
    newUser.isApplied = false;
    newUser.role = role;

    const user = await this.usersService.create(newUser);
    // const token = this.jwtService.sign({ sub: user.id }, { expiresIn: '1d' });
    // console.log(token);
    // const url = `${process.env.APP_URL}/auth/verify?token=${token}`;
    // await this.mailerService.sendMail({
    //   to: user.email,
    //   subject: 'Verify your email',
    //   template: 'verify-email',
    //   context: { name: user.name, url },
    // });
    return { message: 'Registration successful' };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      message: 'Login successful',
    };
  }

  async getProfile(id: number): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException('User not found');
    delete user.password;
    return user;
  }
}