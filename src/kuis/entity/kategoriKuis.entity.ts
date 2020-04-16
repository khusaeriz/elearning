import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
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

  @Column()
  _matpel: string;

  @Column()
  _guru: string;

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
  @JoinColumn({ name: '_matpel' })
  matpel: Matpel;

  @ManyToOne(
    (type) => Guru,
    (guru) => guru.kategoriKuis,
  )
  @JoinColumn({ name: '_guru' })
  guru: Guru;
}
