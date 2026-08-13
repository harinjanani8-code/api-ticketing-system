import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.country.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const country = await this.prisma.country.findUnique({ where: { id } });
    if (!country) throw new NotFoundException('Country not found');
    return country;
  }

  async create(dto: CreateCountryDto) {
    try {
      return await this.prisma.country.create({
        data: { ...dto, status: dto.status ?? 'Active' },
      });
    } catch (err: any) {
      if (err?.code === 'P2002' || err?.kind === 'UniqueConstraintViolation') {
        throw new ConflictException('A country with this country code already exists');
      }
      throw err;
    }
  }

  async update(id: number, dto: UpdateCountryDto) {
    await this.findOne(id);
    try {
      return await this.prisma.country.update({ where: { id }, data: dto });
    } catch (err: any) {
      if (err?.code === 'P2002' || err?.kind === 'UniqueConstraintViolation') {
        throw new ConflictException('A country with this country code already exists');
      }
      throw err;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.country.delete({ where: { id } });
  }
}
