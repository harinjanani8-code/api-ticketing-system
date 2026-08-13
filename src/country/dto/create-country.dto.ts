import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @MaxLength(8)
  countryCode: string;

  @IsString()
  @MaxLength(100)
  countryName: string;

  @IsOptional()
  @IsIn(['Active', 'Suspend'])
  status?: string;
}
