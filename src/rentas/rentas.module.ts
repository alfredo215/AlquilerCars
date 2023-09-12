import { Module } from '@nestjs/common';
import { RentasService } from './rentas.service';
import { RentasController } from './rentas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RentasController],
  providers: [RentasService],
})
export class RentasModule {}
