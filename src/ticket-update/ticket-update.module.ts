import { Module } from '@nestjs/common';
import { TicketUpdateService } from './ticket-update.service';
import { TicketUpdateController } from './ticket-update.controller';

@Module({
  providers: [TicketUpdateService],
  controllers: [TicketUpdateController],
})
export class TicketUpdateModule {}
