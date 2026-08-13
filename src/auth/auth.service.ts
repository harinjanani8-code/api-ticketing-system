import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const login = (dto.login || dto.email || '').trim();
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: { equals: login, mode: 'insensitive' } },
          { email: { equals: login, mode: 'insensitive' } },
        ],
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid login or password');
    }
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Invalid login or password');
    }
    if (user.status === 'Suspend') {
      throw new UnauthorizedException('Your account is suspended');
    }
    const token = await this.jwt.signAsync({
      sub: user.id,
      username: user.username,
    });
    return {
      accessToken: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        team: user.team,
        status: user.status,
      },
    };
  }

  async me(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        team: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }
}
