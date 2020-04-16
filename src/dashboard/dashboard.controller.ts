import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('dashboard')
export class DashboardController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Get()
  async index() {
    return {
      error: false,
      data: {
        murid: (await this.userService.listMurid()).length,
        guru: (await this.userService.listGuru()).length,
      },
    };
  }
}
