import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @MaxLength(100)
  teamName: string;

  @IsString()
  @MaxLength(10)
  teamCode: string;

  @IsOptional()
  @IsIn(['Active', 'Suspend'])
  status?: string;
}
