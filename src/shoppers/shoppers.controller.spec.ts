import { Test, TestingModule } from '@nestjs/testing';
import { ShoppersController } from './shoppers.controller';

describe('ShoppersController', () => {
  let controller: ShoppersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppersController],
    }).compile();

    controller = module.get<ShoppersController>(ShoppersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
