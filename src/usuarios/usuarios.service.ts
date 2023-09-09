import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UsuariosService {

  //----------------------------------------
  constructor(private readonly prismaService: PrismaService) {}
  //----------------------------------------
  /*async findAll() {
    return await this.prismaService.usuarios.findMany()
  }*/
//------------------------------------------------
  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
