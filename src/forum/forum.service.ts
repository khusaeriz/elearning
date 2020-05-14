import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { Forum } from './forum.entity';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateForumDTO } from './dto/createForumDto';
import { UserDetail } from '../user/user-detail.interface';
import { CreateCommentDto } from './dto/createCommentDto';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum) private forumRepo: Repository<Forum>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  createForum(user: UserDetail, dto: CreateForumDTO) {
    const forum = new Forum();
    forum.topik = dto.judul;
    forum.isi = dto.isi;
    forum.username = user.username;
    forum.tanggal = new Date();

    return this.forumRepo.save(forum);
  }

  createComment(user: UserDetail, comment: CreateCommentDto) {
    const newComment = new Comment();
    newComment.username = user.username;
    newComment.content = comment.komen;
    newComment.forum = Object.assign(this.forumRepo.create(), {
      idTopik: comment.forumId,
    }) as Forum;

    return this.commentRepo.save(newComment);
  }

  getAllForum() {
    return this.forumRepo.find();
  }

  getOneForum(id: Forum['idTopik']) {
    return this.forumRepo.findOne(id, { relations: ['comments'] });
  }

  cariForum(keyword: Forum['topik']) {
    return this.forumRepo.find({ topik: Like('%' + keyword + '%') });
  }
}
