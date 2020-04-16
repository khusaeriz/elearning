import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Murid } from './entities/murid.entity';
import { Guru } from './entities/guru.entity';
import { Kelas } from './entities/kelas.entity';
import { UserController } from './user.controller';
import { KelasController } from './kelas/kelas.controller';
import { KelasService } from './kelas/kelas.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Guru, Murid, Kelas])],
  exports: [TypeOrmModule, UserService],
  providers: [UserService, KelasService],
  controllers: [UserController, KelasController],
})
export class UserModule {}
