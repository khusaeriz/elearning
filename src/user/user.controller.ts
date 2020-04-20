import { Controller, Body, Post, Get } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { JWT_SECRET } from '../config';
import { UserService } from './user.service';
import { AddGuruBulkDto } from './dto/add-guru.dto';
import { AddMuridBulkDto } from './dto/add-murid.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() body: any) {
    const user = await this.userService.checkUser(body.username, body.password);
    if (user == undefined) {
      return { error: true, message: 'User not foud' };
    }

    return {
      error: false,
      data: sign({ ...user }, JWT_SECRET, {
        expiresIn: '2h',
      }),
    };
  }

  @Post('/guru/tambah')
  async tambahGuru(@Body() dto: AddGuruBulkDto) {
    try {
      const guru = await this.userService.addGuru(dto.data);
      return { error: false, data: guru };
    } catch (error) {
      return { error: true, message: error };
    }
  }

  @Post('/murid/tambah')
  async tambahMurid(@Body() dto: AddMuridBulkDto) {
    try {
      const murid = await this.userService.addMurid(dto.data);
      return { error: false, data: murid };
    } catch (error) {
      return { error: true, message: error };
    }
  }

  @Get('/guru')
  async listGuru() {
    return { error: false, data: await this.userService.listGuru() };
  }

  @Get('/murid')
  async listMurid() {
    return { error: false, data: await this.userService.listMurid() };
  }
}
