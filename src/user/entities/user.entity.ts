import { Entity, Column } from 'typeorm';

@Entity()
export class User {
  @Column({ length: 100, primary: true })
  username: string;

  @Column({ length: 32 })
  password: string;

  @Column({ length: 100 })
  nama: string;

  @Column({ length: 10 })
  hakAkses: string;
}
