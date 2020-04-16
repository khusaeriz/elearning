import { Test, TestingModule } from '@nestjs/testing';
import { MatpelController } from './matpel.controller';

describe('Matpel Controller', () => {
  let controller: MatpelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatpelController],
    }).compile();

    controller = module.get<MatpelController>(MatpelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
