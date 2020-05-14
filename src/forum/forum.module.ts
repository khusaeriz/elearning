import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from './forum.entity';
import { Comment } from "./comment.entity";
import { UserMiddleware } from '../user/user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Forum, Comment]), UserMiddleware],
  exports: [TypeOrmModule],
  controllers: [ForumController],
  providers: [ForumService]
})
export class ForumModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('forum');
  }}
