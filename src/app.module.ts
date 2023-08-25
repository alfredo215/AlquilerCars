import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RentaModule } from './renta/renta.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsuariosModule, RentaModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
