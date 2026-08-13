import { IsOptional, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  @MaxLength(200)
  password: string;

  @IsOptional()
  @IsString()
  captchaId?: string;

  @IsOptional()
  @IsString()
  captchaCode?: string;
}
