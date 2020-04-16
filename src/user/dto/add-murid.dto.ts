import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddMuridBulkDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AddMuridDto)
  data: AddMuridDto[];
}

export class AddMuridDto {
  @IsNotEmpty()
  @Length(2, 10)
  nis: number;

  @IsNotEmpty()
  @Length(2, 10)
  nisn: number;

  @IsNotEmpty()
  @Length(2, 100)
  username: string;

  @IsNotEmpty()
  @Length(3, 10)
  password: string;

  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  kelasId: string;

  ttl: string;
  alamat: string;
  telp: string;
  email: string;
}
