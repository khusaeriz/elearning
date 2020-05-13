import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Matpel } from '../../matpel/entities/matpel.entity';
import { Guru } from '../../user/entities/guru.entity';
import { Kuis } from './kuis.entity';
import { Nilai } from './nilai.entity';

@Entity()
export class KategoriKuis {
  @PrimaryGeneratedColumn()
  idKategoriKuis: number;

  @Column({ length: 35 })
  nama: string;

  @Column()
  jumlahSoal: number;

  @Column()
  _matpel: string;

  @Column()
  _guru: string;

  nilai: Nilai;

  @OneToMany(
    () => Kuis,
    (kuis) => kuis.kategoriKuis,
  )
  kuis: Kuis[];

  @ManyToOne(
    () => Matpel,
    (matpel) => matpel.kategoriKuis,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: '_matpel' })
  matpel: Matpel;

  @ManyToOne(
    () => Guru,
    (guru) => guru.kategoriKuis,
  )
  @JoinColumn({ name: '_guru' })
  guru: Guru;
}
