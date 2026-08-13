import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as svgCaptcha from 'svg-captcha';

export interface CaptchaRecord {
  id: string;
  code: string;
  expiresAt: number;
}

@Injectable()
export class CaptchaService {
  private store = new Map<string, CaptchaRecord>();

  generate(): CaptchaRecord & { svg: string } {
    const captcha = svgCaptcha.create({ size: 5, noise: 3 });

    const record: CaptchaRecord = {
      id: randomBytes(16).toString('hex'),
      code: captcha.text,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };
    this.store.set(record.id, record);

    return { ...record, svg: captcha.data };
  }

  verify(id: string, code: string): boolean {
    if (!id || !code) return false;
    const record = this.store.get(id);
    if (!record) return false;
    this.store.delete(id);
    if (record.expiresAt < Date.now()) return false;
    return record.code.toUpperCase() === code.trim().toUpperCase();
  }
}