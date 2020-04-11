import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { KonsultasiController } from './konsultasi.controller';
import { UserMiddleware } from '../user/user.middleware';
import { KonsultasiService } from './konsultasi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Konsultasi } from './konsultasi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Konsultasi]), UserMiddleware],
  exports: [TypeOrmModule],
  controllers: [KonsultasiController],
  providers: [KonsultasiService],
})
export class KonsultasiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('konsultasi');
  }
}
