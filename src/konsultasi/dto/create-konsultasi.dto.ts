import { IsNotEmpty } from 'class-validator';

export class CreateKonsultasiDto {
  @IsNotEmpty()
  idKonsultasi: string;

  @IsNotEmpty()
  judul: string;

  @IsNotEmpty()
  pertanyaan: string;

  @IsNotEmpty()
  guruId: string;
}
