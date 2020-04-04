import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Forum {
  @PrimaryGeneratedColumn()
  idTopik: number;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 50 })
  topik: string;

  @Column({ type: 'text' })
  isi: string;

  @Column()
  tanggal: Date;
}
