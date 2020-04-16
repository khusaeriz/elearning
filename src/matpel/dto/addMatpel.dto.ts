import { IsNotEmpty } from 'class-validator';

export class AddMatpelDto {
  @IsNotEmpty()
  idMatpel: string;

  @IsNotEmpty()
  namaMatpel: string;

  keterangan: string;
}
