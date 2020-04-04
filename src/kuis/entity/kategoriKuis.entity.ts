import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Matpel } from '../../matpel/entities/matpel.entity';
import { Guru } from '../../user/entities/guru.entity';
import { Kuis } from './kuis.entity';

@Entity()
export class KategoriKuis {
  @Column({ primary: true })
  idKategoriKuis: number;

  @Column({ length: 35 })
  nama: string;

  @Column()
  jumlahSoal: number;

  @OneToMany(
    (type) => Kuis,
    (kuis) => kuis.kategoriKuis,
  )
  kuis: Kuis[];

  @ManyToOne(
    (type) => Matpel,
    (matpel) => matpel.kategoriKuis,
    { onDelete: 'CASCADE' },
  )
  matpel: Matpel;

  @ManyToOne(
    (type) => Guru,
    (guru) => guru.kategoriKuis,
  )
  guru: Guru;
}
