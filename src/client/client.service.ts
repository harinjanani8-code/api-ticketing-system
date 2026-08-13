import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.client.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async create(dto: CreateClientDto) {
    try {
      return await this.prisma.client.create({
        data: { ...dto, status: dto.status ?? 'Active' },
      });
    } catch (err: any) {
      if (err?.code === 'P2002' || err?.kind === 'UniqueConstraintViolation') {
        throw new ConflictException('A client with this client code or email already exists');
      }
      throw err;
    }
  }

  async update(id: number, dto: UpdateClientDto) {
    await this.findOne(id);
    try {
      return await this.prisma.client.update({ where: { id }, data: dto });
    } catch (err: any) {
      if (err?.code === 'P2002' || err?.kind === 'UniqueConstraintViolation') {
        throw new ConflictException('A client with this client code or email already exists');
      }
      throw err;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.client.delete({ where: { id } });
  }
}
