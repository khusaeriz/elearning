import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Murid } from './entities/murid.entity';
import { Guru } from './entities/guru.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Murid, Guru])],
  providers: [UserService],
})
export class UserModule {}
