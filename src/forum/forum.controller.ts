import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDTO } from './dto/createForumDto';
import { GetUser } from '../user/user.decorator';
import { UserDetail } from '../user/user-detail.interface';
import { CreateCommentDto } from './dto/createCommentDto';

@Controller('forum')
export class ForumController {
  constructor(private forumService: ForumService) {}

  @Get()
  async index() {
    try {
      return { error: false, data: await this.forumService.getAllForum() };
    } catch (error) {}
  }

  @Get(':id')
  async detail(@Param('id') id: number) {
    try {
      return {
        error: false,
        data: await this.forumService.getOneForum(id),
      };
    } catch (error) {}
  }

  @Post()
  async buatTopik(@Body() dto: CreateForumDTO, @GetUser() user: UserDetail) {
    try {
      return {
        error: false,
        data: await this.forumService.createForum(user, dto),
      };
    } catch (error) {
      return { error: true, message: error.toString() };
    }
  }

  @Post('komen')
  async komen(@Body() dto: CreateCommentDto, @GetUser() user: UserDetail) {
    try {
      return {
        error: false,
        data: await this.forumService.createComment(user, dto),
      };
    } catch (error) {
      return { error: true, message: error.toString() };
    }
  }
}
