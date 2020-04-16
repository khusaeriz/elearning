import { Module } from '@nestjs/common';
import { KuisController } from './kuis.controller';
import { KuisService } from './kuis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kuis } from './entity/kuis.entity';
import { KategoriKuisController } from './kategori-kuis/kategori-kuis.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Kuis])],
  exports: [TypeOrmModule],
  controllers: [KuisController, KategoriKuisController],
  providers: [KuisService],
})
export class KuisModule {}
