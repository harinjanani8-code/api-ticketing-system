import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketUpdateDto } from './dto/create-ticket-update.dto';
import { UpdateTicketUpdateDto } from './dto/update-ticket-update.dto';

@Injectable()
export class TicketUpdateService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.ticketUpdate.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const update = await this.prisma.ticketUpdate.findUnique({ where: { id } });
    if (!update) throw new NotFoundException('Ticket update not found');
    return update;
  }

  create(dto: CreateTicketUpdateDto) {
    return this.prisma.ticketUpdate.create({
      data: { ...dto, updateStatus: dto.updateStatus ?? 'Development' },
    });
  }

  async update(id: number, dto: UpdateTicketUpdateDto) {
    await this.findOne(id);
    return this.prisma.ticketUpdate.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.ticketUpdate.delete({ where: { id } });
  }
}
