import { IsIn, IsOptional } from 'class-validator';

export class ListKonsultasiDto {
  @IsIn(['wait'])
  @IsOptional()
  status?: 'wait';
}
