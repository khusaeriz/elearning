import { IsNotEmpty, IsArray, ArrayMinSize } from "class-validator";
import { Type } from "class-transformer";

export class CreateKuisDto {
  idKuis: string;
  soal: string;
  a: string;
  b: string;
  c: string;
  d: string;
  kunci: string;
  _kategoriKuis: string;
}

export class CreateKuisBulkDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateKuisDto)
  kuis: CreateKuisDto[]
}