import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { KategoriKuis } from './kategoriKuis.entity';
import { Guru } from '../../user/entities/guru.entity';

@Entity()
export class Kuis {
  @PrimaryGeneratedColumn()
  idKuis: number;

  @Column({ type: 'text' })
  soal: string;

  @Column()
  a: string;

  @Column()
  b: string;

  @Column()
  c: string;

  @Column()
  d: string;

  @Column({ length: 1 })
  kunci: string;

  @ManyToOne(
    (type) => KategoriKuis,
    (katKuis) => katKuis.kuis,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  kategoriKuis: KategoriKuis;

  @ManyToOne(
    (type) => Guru,
    (guru) => guru.kuis,
    { onDelete: 'CASCADE' },
  )
  guru: Guru;
}
