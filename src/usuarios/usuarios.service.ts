import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class UsuariosService {

  //----------------------------------------
  constructor(private readonly prismaService: PrismaService) {}
  //----------------------------------------
  async findAll() {
    return await this.prismaService.usuarios.findMany()
  }
//------------------------------------------------
async findOne(id: number) {
  return await this.prismaService.usuarios.findUnique({
    where: {
      usuarioId: id,
    },
  });
}
 // Eliminar
 async remove(id: number): Promise<string> {
  // Encuentra al usuario que se va a eliminar
  const usuario = await this.prismaService.usuarios.findUnique({
    where: {
      usuarioId: id,
    },
  });

  // Si no se encuentra al usuario, lanza una excepción
  if (!usuario) {
    throw new HttpException("Usuario no encontrado.", 404);
  }

  // Genera un token JWT con los datos del usuario
  const token = jwt.sign(
    { email: usuario.email, nombre: usuario.nombre },
    process.env.CLAVE_SECRETA,
    { expiresIn: '36000s' }
  );

  // Elimina al usuario
  await this.prismaService.usuarios.delete({
    where: {
      usuarioId: id,
    },
  });

  // Devuelve el token generado
  return token;
}


}
