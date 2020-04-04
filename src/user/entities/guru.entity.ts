import { Entity, Column, OneToMany } from 'typeorm';
import { KategoriKuis } from '../../kuis/entity/kategoriKuis.entity';
import { Kuis } from '../../kuis/entity/kuis.entity';
import { Konsultasi } from '../../konsultasi/konsultasi.entity';

@Entity()
export class Guru {
  @Column({ primary: true })
  nip: number;

  @Column()
  nuptk: number;

  @Column({ length: 10 })
  username: string;

  @Column({ length: 35 })
  nama: string;

  @Column({ length: 40 })
  ttl: string;

  @Column({ length: 40 })
  alamat: string;

  @Column({ length: 20 })
  jabatan: string;

  @Column({ length: 13 })
  telp: string;

  @Column({ length: 25 })
  email: string;

  @OneToMany(
    (type) => KategoriKuis,
    (katKuis) => katKuis.guru,
  )
  kategoriKuis: KategoriKuis[];

  @OneToMany(
    (type) => Kuis,
    (kuis) => kuis.guru,
  )
  kuis: Kuis[];

  @OneToMany(
    (type) => Konsultasi,
    (konsultasi) => konsultasi.guru,
  )
  konsultasi: Konsultasi[];
}
