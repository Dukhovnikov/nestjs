import { Test, TestingModule } from '@nestjs/testing';
import { DeposService } from './depos.service';

describe('DeposService', () => {
  let service: DeposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeposService],
    }).compile();

    service = module.get<DeposService>(DeposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
