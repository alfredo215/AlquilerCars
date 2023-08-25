import { Test, TestingModule } from '@nestjs/testing';
import { RentaController } from './renta.controller';
import { RentaService } from './renta.service';

describe('RentaController', () => {
  let controller: RentaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentaController],
      providers: [RentaService],
    }).compile();

    controller = module.get<RentaController>(RentaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
