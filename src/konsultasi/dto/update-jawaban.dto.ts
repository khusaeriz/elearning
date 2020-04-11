import { IsNotEmpty } from 'class-validator';

export class UpdateJawabanDto {
  @IsNotEmpty()
  idKonsultasi: string;

  @IsNotEmpty()
  jawaban: string;
}
