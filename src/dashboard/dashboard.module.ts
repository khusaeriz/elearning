import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  exports: [UserModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
