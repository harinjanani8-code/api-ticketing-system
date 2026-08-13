import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.team.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const team = await this.prisma.team.findUnique({ where: { id } });
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async create(dto: CreateTeamDto) {
    try {
      return await this.prisma.team.create({
        data: { ...dto, status: dto.status ?? 'Active' },
      });
    } catch (err: any) {
      if (err?.code === 'P2002' || err?.kind === 'UniqueConstraintViolation') {
        throw new ConflictException('A team with this team code already exists');
      }
      throw err;
    }
  }

  async update(id: number, dto: UpdateTeamDto) {
    await this.findOne(id);
    try {
      return await this.prisma.team.update({ where: { id }, data: dto });
    } catch (err: any) {
      if (err?.code === 'P2002' || err?.kind === 'UniqueConstraintViolation') {
        throw new ConflictException('A team with this team code already exists');
      }
      throw err;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.team.delete({ where: { id } });
  }
}
