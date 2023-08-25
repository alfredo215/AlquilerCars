import { Test, TestingModule } from '@nestjs/testing';
import { RentaService } from './renta.service';

describe('RentaService', () => {
  let service: RentaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentaService],
    }).compile();

    service = module.get<RentaService>(RentaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
