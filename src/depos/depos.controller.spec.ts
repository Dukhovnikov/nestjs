import { Test, TestingModule } from '@nestjs/testing';
import { DeposController } from './depos.controller';

describe('DeposController', () => {
  let controller: DeposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeposController],
    }).compile();

    controller = module.get<DeposController>(DeposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
