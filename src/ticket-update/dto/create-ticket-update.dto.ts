import { IsIn, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTicketUpdateDto {
  @IsString()
  @MaxLength(30)
  ticketNo: string;

  @IsOptional()
  @IsIn(['Open', 'Development', 'Testing', 'Ready For UAT', 'Closed'])
  updateStatus?: string;

  @IsString()
  @MaxLength(100)
  assignTo: string;

  @IsString()
  @MaxLength(20)
  assignedOn: string;

  @IsNumber()
  hours: number;

  @IsString()
  @MaxLength(500)
  comments: string;
}
