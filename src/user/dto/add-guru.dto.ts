import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddGuruDto {
  @IsNotEmpty()
  // @Length(10, 10)
  nip: string;

  @IsNotEmpty()
  // @Length(16, 16)
  nuptk: string;

  @IsNotEmpty()
  @Length(3, 10)
  username: string;

  @IsNotEmpty()
  @Length(3, 10)
  password: string;

  @IsNotEmpty()
  @Length(1, 35)
  nama: string;

  ttl: string;
  alamat: string;
  jabatan: string;
  telp: string;
  email: string;
}

export class AddGuruBulkDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AddGuruDto)
  data: AddGuruDto[];
}
