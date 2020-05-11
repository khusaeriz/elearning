import {
  IsNotEmpty,
  Length,
  ArrayMinSize,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';


export class AddKelasDto {
  @IsNotEmpty()
  @Length(3, 3)
  idKelas: string;

  @IsNotEmpty()
  @Length(1, 4)
  namaKelas: string;

  @IsNotEmpty()
  waliKelas: string;

  keterangan: string;
}


export class AddKelasBulkDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AddKelasDto)
  data: AddKelasDto[];
}
