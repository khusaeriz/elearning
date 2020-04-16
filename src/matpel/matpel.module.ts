import { Module } from '@nestjs/common';
import { MatpelController } from './matpel.controller';
import { MatpelService } from './matpel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matpel } from './entities/matpel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Matpel])],
  exports: [TypeOrmModule],
  controllers: [MatpelController],
  providers: [MatpelService],
})
export class MatpelModule {}
