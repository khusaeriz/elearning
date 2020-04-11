import { User } from './entities/user.entity';
import { Guru } from './entities/guru.entity';
import { Murid } from './entities/murid.entity';

export interface UserDetail extends User {
  detail: Guru | Murid;
}
