import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from './forum.entity';
import { Comment } from "./comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Forum, Comment])],
  exports: [TypeOrmModule],
  controllers: [ForumController],
  providers: [ForumService]
})
export class ForumModule {}
