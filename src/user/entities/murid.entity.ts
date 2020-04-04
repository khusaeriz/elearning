import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Kelas } from './kelas.entity';
import { Nilai } from '../../kuis/entity/nilai.entity';
import { Konsultasi } from '../../konsultasi/konsultasi.entity';

@Entity()
export class Murid {
  @Column({ primary: true })
  nis: number;

  @Column()
  nisn: number;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 35 })
  nama: string;

  @Column({ length: 40 })
  ttl: string;

  @Column({ length: 40 })
  alamat: string;

  @Column({ length: 13 })
  telp: string;

  @Column({ length: 25 })
  email: string;

  @ManyToOne(
    (type) => Kelas,
    (kelas) => kelas.murid,
    { onDelete: 'CASCADE' },
  )
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
