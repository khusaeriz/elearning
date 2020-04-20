import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MatpelController } from './matpel.controller';
import { MatpelService } from './matpel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matpel } from './entities/matpel.entity';
import { UserMiddleware } from '../user/user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Matpel]), UserMiddleware],
  exports: [TypeOrmModule],
  controllers: [MatpelController],
  providers: [MatpelService],
})
export class MatpelModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('matpel');
  }
}
