import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Forum } from "./forum.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    content: string;

    @ManyToOne(() => Forum, forum => forum.comments)
    forum: Forum
}