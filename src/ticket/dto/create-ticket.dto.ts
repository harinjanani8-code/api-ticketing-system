import { IsIn, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @MaxLength(30)
  ticketNo: string;

  @IsString()
  @MaxLength(100)
  client: string;

  @IsString()
  @MaxLength(20)
  ticketDate: string;

  @IsString()
  @MaxLength(20)
  deliveryDate: string;

  @IsString()
  @MaxLength(100)
  team: string;

  @IsString()
  @MaxLength(100)
  requestedBy: string;

  @IsString()
  @MaxLength(100)
  assignTo: string;

  @IsString()
  @MaxLength(50)
  sprint: string;

  @IsOptional()
  @IsIn(['Open', 'Development', 'Testing', 'Ready For UAT', 'Closed'])
  ticketStatus?: string;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsString()
  @MaxLength(100)
  owner: string;

  @IsNumber()
  ownerHrs: number;

  @IsString()
  @MaxLength(100)
  developer: string;

  @IsNumber()
  developerHrs: number;

  @IsString()
  @MaxLength(100)
  tester: string;

  @IsNumber()
  testerHrs: number;
}
