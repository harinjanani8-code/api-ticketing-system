import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketUpdateService } from './ticket-update.service';
import { CreateTicketUpdateDto } from './dto/create-ticket-update.dto';
import { UpdateTicketUpdateDto } from './dto/update-ticket-update.dto';

@Controller('ticket-update')
export class TicketUpdateController {
  constructor(private readonly ticketUpdateService: TicketUpdateService) {}

  @Get()
  findAll() {
    return this.ticketUpdateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketUpdateService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTicketUpdateDto) {
    return this.ticketUpdateService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTicketUpdateDto) {
    return this.ticketUpdateService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ticketUpdateService.remove(id);
  }
}
