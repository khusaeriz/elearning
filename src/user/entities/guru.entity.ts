import { Entity, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { KategoriKuis } from '../../kuis/entity/kategoriKuis.entity';
import { Kuis } from '../../kuis/entity/kuis.entity';
import { Konsultasi } from '../../konsultasi/konsultasi.entity';
import { Kelas } from './kelas.entity';
import { User } from './user.entity';

@Entity()
export class Guru {
  @Column({ primary: true, length: 10 })
  nip: string;

  @Column({ length: 16 })
  nuptk: string;

  @Column({ length: 10, unique: true })
  username: string;

  @Column({ length: 35 })
  nama: string;

  @Column({ length: 40, nullable: true })
  ttl: string;

  @Column({ length: 40, nullable: true })
  alamat: string;

  @Column({ length: 20, nullable: true })
  jabatan: string;

  @Column({ length: 13, nullable: true })
  telp: string;

  @Column({ length: 25, nullable: true })
  email: string;

  @OneToOne(
    (type) => Kelas,
    (kelas) => kelas.guru,
  )
  kelas: Kelas;

  @OneToOne(
    (type) => User,
    (user) => user.guru,
    { cascade: ['insert'], onDelete: 'CASCADE' },
  )
  @JoinColumn({name: 'username'})
  user: User;

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
