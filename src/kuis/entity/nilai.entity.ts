import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Murid } from '../../user/entities/murid.entity';
import { Matpel } from '../../matpel/entities/matpel.entity';

@Entity()
export class Nilai {
  @PrimaryGeneratedColumn()
  idNilai: number;

  @Column()
  tanggalUjian: Date;

  @Column()
  nilai: number;

  @ManyToOne(
    (type) => Murid,
    (murid) => murid.nilai,
    { onDelete: 'CASCADE' },
  )
  murid: Murid;

  @ManyToOne(
    (type) => Matpel,
    (matpel) => matpel.nilai,
    { onDelete: 'CASCADE' },
  )
  matpel: Matpel;
}
