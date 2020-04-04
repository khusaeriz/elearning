import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  Length,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddGuruBulkDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AddGuruDto)
  data: AddGuruDto[];
}

export class AddGuruDto {
  @IsNotEmpty()
  @Length(10, 10)
  nip: string;

  @IsNotEmpty()
  @Length(16, 16)
  nuptk: string;

  @IsNotEmpty()
  @Length(3, 10)
  username: string;

  @IsNotEmpty()
  @Length(1, 35)
  nama: string;

  @Length(1, 40)
  @IsOptional()
  ttl: string;

  @Length(1, 40)
  @IsOptional()
  alamat: string;

  @Length(1, 20)
  @IsOptional()
  jabatan: string;

  @Length(1, 13)
  @IsOptional()
  telp: string;

  @Length(3, 25)
  @IsOptional()
  email: string;
}
