import { Entity, Column, ManyToOne } from 'typeorm';
import { Guru } from '../user/entities/guru.entity';
import { Murid } from '../user/entities/murid.entity';

@Entity()
export class Konsultasi {
  @Column({ primary: true, length: 34 })
  idKonsultasi: string;

  @Column()
  tanggalTanya: Date;

  @Column({ length: 25 })
  judul: string;

  @Column({ type: 'text' })
  pertanyaan: string;

  @Column({ length: 15 })
  status: string;

  @Column()
  jawaban: string;

  @ManyToOne(
    (type) => Guru,
    (guru) => guru.konsultasi,
    { onDelete: 'CASCADE' },
  )
  guru: Guru;

  
  @ManyToOne(
    (type) => Murid,
    (murid) => murid.konsultasi,
    { onDelete: 'CASCADE' },
  )
  murid: Murid;
}
