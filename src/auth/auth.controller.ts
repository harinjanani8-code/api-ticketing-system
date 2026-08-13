import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CaptchaService } from './captcha.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private captcha: CaptchaService,
  ) {}

  @Get('captcha')
  getCaptcha() {
    const record = this.captcha.generate();
    return { id: record.id, svg: record.svg };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    if (!dto.captchaId || !dto.captchaCode) {
      throw new UnauthorizedException('Please solve the captcha to continue');
    }
    if (!this.captcha.verify(dto.captchaId, dto.captchaCode)) {
      throw new UnauthorizedException('Captcha is incorrect. Please try again');
    }
    return this.auth.login(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser('id') userId: number) {
    return this.auth.me(userId);
  }
}