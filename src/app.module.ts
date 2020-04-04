import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MatpelModule } from './matpel/matpel.module';
import { KuisModule } from './kuis/kuis.module';
import { KonsultasiModule } from './konsultasi/konsultasi.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, MatpelModule, KuisModule, KonsultasiModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
