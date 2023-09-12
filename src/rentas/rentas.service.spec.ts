import { Test, TestingModule } from '@nestjs/testing';
import { RentasService } from './rentas.service';

describe('RentasService', () => {
  let service: RentasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentasService],
    }).compile();

    service = module.get<RentasService>(RentasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
