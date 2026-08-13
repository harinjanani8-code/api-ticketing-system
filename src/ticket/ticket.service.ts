import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.ticket.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({ where: { id } });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  create(dto: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: { ...dto, ticketStatus: dto.ticketStatus ?? 'Open' },
    });
  }

  async update(id: number, dto: UpdateTicketDto) {
    await this.findOne(id);
    return this.prisma.ticket.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.ticket.delete({ where: { id } });
  }
}
