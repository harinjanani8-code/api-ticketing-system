import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        team: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
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
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(dto: CreateUserDto) {
    const password = await bcrypt.hash(dto.password, 10);
    try {
      return await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          team: dto.team,
          status: dto.status ?? 'Active',
          password,
        },
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
    } catch (err: any) {
      if (err?.code === 'P2002' || err?.kind === 'UniqueConstraintViolation') {
        const field = (err?.meta?.target ?? 'value') === 'User_username_key' ? 'username' : 'email';
        throw new ConflictException(`A user with this ${field} already exists`);
      }
      throw err;
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
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
    } catch (err: any) {
      if (err?.code === 'P2002' || err?.kind === 'UniqueConstraintViolation') {
        throw new ConflictException('Username or email already exists');
      }
      throw err;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
