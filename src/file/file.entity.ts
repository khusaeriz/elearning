import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  idFile: number;

  @Column({ length: 100 })
  namaFile: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 50 })
  judul: string;

  @Column({ length: 100 })
  tipe: string;

  @Column({ length: 50 })
  kepada: string;

  @Column()
  tanggalUpload: Date;
}
