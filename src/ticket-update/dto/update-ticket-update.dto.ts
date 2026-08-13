import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketUpdateDto } from './create-ticket-update.dto';

export class UpdateTicketUpdateDto extends PartialType(CreateTicketUpdateDto) {}
