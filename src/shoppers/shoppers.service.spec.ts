import { Test, TestingModule } from '@nestjs/testing';
import { ShoppersService } from './shoppers.service';

describe('ShoppersService', () => {
  let service: ShoppersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppersService],
    }).compile();

    service = module.get<ShoppersService>(ShoppersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
