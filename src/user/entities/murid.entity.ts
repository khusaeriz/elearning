import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Kelas } from './kelas.entity';
import { Nilai } from '../../kuis/entity/nilai.entity';
import { Konsultasi } from '../../konsultasi/konsultasi.entity';

@Entity()
export class Murid {
  @Column({ primary: true })
  nis: number;

  @Column()
  nisn: number;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 35 })
  nama: string;

  @Column({ length: 40, nullable: true })
  ttl: string;

  @Column({ length: 40, nullable: true })
  alamat: string;

  @Column({ length: 13, nullable: true })
  telp: string;

  @Column({ length: 25, nullable: true })
  email: string;

  @Column({ length: 3, nullable: true })
  kelasId: string;

  @ManyToOne(
    (type) => Kelas,
    (kelas) => kelas.murid,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'kelasId' })
  kelas: Kelas;

  @OneToMany(
    (type) => Nilai,
    (nilai) => nilai.murid,
  )
  nilai: Nilai[];

  @OneToMany(
    (type) => Konsultasi,
    (konsultasi) => konsultasi.murid,
  )
  konsultasi: Konsultasi[];
}
