import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Murid } from '../../user/entities/murid.entity';
import { Matpel } from '../../matpel/entities/matpel.entity';
import { KategoriKuis } from './kategoriKuis.entity';

@Entity()
export class Nilai {
  @PrimaryGeneratedColumn()
  idNilai: number;

  @Column()
  tanggalUjian: Date;

  @Column()
  nilai: number;

  @Column()
  _katKuis: number;

  @ManyToOne(
    () => Murid,
    (murid) => murid.nilai,
    { onDelete: 'CASCADE' },
  )
  murid: Murid;

  @ManyToOne(() => KategoriKuis, { onDelete: 'CASCADE' })
  @JoinColumn({ name: '_katKuis' })
  katKuis: KategoriKuis;

  @ManyToOne(
    () => Matpel,
    (matpel) => matpel.nilai,
    { onDelete: 'CASCADE' },
  )
  matpel: Matpel;
}
