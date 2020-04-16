import { Test, TestingModule } from '@nestjs/testing';
import { KategoriKuisController } from './kategori-kuis.controller';

describe('KategoriKuis Controller', () => {
  let controller: KategoriKuisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KategoriKuisController],
    }).compile();

    controller = module.get<KategoriKuisController>(KategoriKuisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
