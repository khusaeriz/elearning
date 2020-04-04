import { Controller, Get, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AddGuruBulkDto } from './dto/addGuru.dto';
import { AddMuridBulkDto } from './dto/addMurid.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/guru/login')
  async loginGuru(@Body() body: any) {
    const guru = await this.userService.getGuruByUsernameAndPassword(
      body.username,
      body.password,
    );

    return {
      error: false,
      data: guru,
    };
  }

  @Post('/guru/tambah')
  async tambahGuru(@Body() dto: AddGuruBulkDto) {
    try {
      const guru = await this.userService.addGuru(dto.data);
      return { error: false, data: guru };
    } catch (error) {
      console.log(error);
      return { error: true, message: error };
    }
  }

  @Post('/murid/tambah')
  async tambahMurid(@Body() dto: AddMuridBulkDto) {
    try {
    //   const murid = await this.userService.addMurid(dto.data);
    //   return { error: false, data: murid };
    } catch (error) {
      console.log(error);
      return { error: true, message: error };
    }
  }
}
