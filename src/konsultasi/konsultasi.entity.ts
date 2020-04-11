import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Guru } from '../user/entities/guru.entity';
import { Murid } from '../user/entities/murid.entity';

@Entity()
export class Konsultasi {
  @Column({ primary: true, length: 34 })
  idKonsultasi: string;

  @CreateDateColumn()
  tanggalTanya: Date;

  @Column({ length: 25 })
  judul: string;

  @Column({ type: 'text' })
  pertanyaan: string;

  @Column({ length: 15, default: 'wait' })
  status: string;

  @Column({ type: 'text', nullable: true })
  jawaban: string;

  @Column()
  guruId: string;

  @Column()
  muridId: string;

  @ManyToOne(
    (type) => Guru,
    (guru) => guru.konsultasi,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'guruId' })
  guru: Guru;

  @ManyToOne(
    (type) => Murid,
    (murid) => murid.konsultasi,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'muridId' })
  murid: Murid;
}
