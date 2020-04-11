import { Test, TestingModule } from '@nestjs/testing';
import { KonsultasiController } from './konsultasi.controller';

describe('Konsultasi Controller', () => {
  let controller: KonsultasiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KonsultasiController],
    }).compile();

    controller = module.get<KonsultasiController>(KonsultasiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
