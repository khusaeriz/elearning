import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { Forum } from './forum.entity';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum) private forumRepo: Repository<Forum>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  createForum(forum: Forum) {
    return this.forumRepo.save(forum);
  }

  createComment(comment: Comment) {
    return this.commentRepo.save(comment);
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
