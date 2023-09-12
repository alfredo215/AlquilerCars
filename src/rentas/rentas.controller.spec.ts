import { Test, TestingModule } from '@nestjs/testing';
import { RentasController } from './rentas.controller';
import { RentasService } from './rentas.service';

describe('RentasController', () => {
  let controller: RentasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentasController],
      providers: [RentasService],
    }).compile();

    controller = module.get<RentasController>(RentasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
