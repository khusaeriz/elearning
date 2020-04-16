import { Test, TestingModule } from '@nestjs/testing';
import { MatpelService } from './matpel.service';

describe('MatpelService', () => {
  let service: MatpelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatpelService],
    }).compile();

    service = module.get<MatpelService>(MatpelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
