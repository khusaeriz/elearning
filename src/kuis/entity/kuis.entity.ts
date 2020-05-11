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

  @Column()
  _guru: string;
  
  @Column()
  _kategoriKuis: string;

  @ManyToOne(
    () => KategoriKuis,
    (katKuis) => katKuis.kuis,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({name: '_kategoriKuis'})
  kategoriKuis: KategoriKuis;

  @ManyToOne(
    () => Guru,
    (guru) => guru.kuis,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({name: '_guru'})
  guru: Guru;
}
