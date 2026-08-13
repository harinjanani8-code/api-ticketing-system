import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CountryModule } from './country/country.module';
import { TeamModule } from './team/team.module';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { TicketUpdateModule } from './ticket-update/ticket-update.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CountryModule,
    TeamModule,
    ClientModule,
    UserModule,
    TicketModule,
    TicketUpdateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
