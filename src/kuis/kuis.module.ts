import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { KuisController } from './kuis.controller';
import { KuisService } from './kuis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kuis } from './entity/kuis.entity';
import { KategoriKuisController } from './kategori-kuis/kategori-kuis.controller';
import { KategoriKuis } from './entity/kategoriKuis.entity';
import { UserMiddleware } from '../user/user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Kuis, KategoriKuis]), UserMiddleware],
  exports: [TypeOrmModule],
  controllers: [KuisController, KategoriKuisController],
  providers: [KuisService],
})
export class KuisModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('kuis');
  }
}
