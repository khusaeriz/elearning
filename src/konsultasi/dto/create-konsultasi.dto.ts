import { IsNotEmpty } from 'class-validator';

export class CreateKonsultasiDto {
  @IsNotEmpty()
  judul: string;

  @IsNotEmpty()
  pertanyaan: string;

  @IsNotEmpty()
  guruId: string;
}
