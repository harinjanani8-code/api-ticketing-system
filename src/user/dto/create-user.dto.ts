import { IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(100)
  team: string;

  @IsOptional()
  @IsIn(['Active', 'Suspend'])
  status?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(100)
  password: string;
}
