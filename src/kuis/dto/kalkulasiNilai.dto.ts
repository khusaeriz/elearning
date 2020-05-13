import { KategoriKuis } from '../entity/kategoriKuis.entity';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class KalkulasiNilaiDTO {
  @IsNotEmpty()
  @Type(() => KategoriKuis)
  kuis: KategoriKuis;
}
