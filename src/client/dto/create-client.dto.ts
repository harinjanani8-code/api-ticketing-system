import { IsEmail, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MaxLength(100)
  clientName: string;

  @IsString()
  @MaxLength(10)
  clientCode: string;

  @IsString()
  @MaxLength(100)
  country: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsIn(['Active', 'Suspend'])
  status?: string;
}
