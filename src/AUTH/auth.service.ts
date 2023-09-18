import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginUsuario } from "src/usuarios/interface/login-usuario.interface";
import { UsuariosService } from "src/usuarios/usuarios.service";
import * as bcrypt from 'bcryptjs';
import { CreateUsuario } from 'src/usuarios/interface/create-usuario.interface';
import { UpdateUsuario } from 'src/usuarios/interface/update-usuario.interface';




@Injectable()
export class AuthService{
   
    constructor(
        private readonly prismaService:PrismaService,
        private jwtService:JwtService,
        private readonly usuariosService:UsuariosService
    ){}

//----------------------------------------------------------------
// Login
    async login({email, pass}:LoginUsuario):Promise<any> {
        const claveencriptada= await  bcrypt.hash(pass,10)
   
        const usuarioExistente= await this.prismaService.usuarios.findUnique({
          where:{
            email,
          },
        });
   
        if(usuarioExistente){
          //comprobar hash de la contraseña
          const passwordCorrecto= await bcrypt.compare(
            pass,
            usuarioExistente.pass
            );
          if(!passwordCorrecto){
            throw new HttpException("La contraseña es incorrecta.",400);
          }else{
            const token= this.jwtService.sign({
              email:usuarioExistente.email,
              nombre:usuarioExistente.nombre,
            });
           
            return { statusCode: 200, token };
          }
        }else{
          throw new HttpException("El usuario no existe.",400);
        }

      }
      //----------------------------------------------------------------
      // Registrar
      async registrar({ email, nombre, pass }: CreateUsuario) {
        // Encriptar la contraseña proporcionada
        const claveencriptada = await bcrypt.hash(pass, 10);
      
        // Verificar si ya existe un usuario con el mismo correo electrónico
        const usuarioExistente = await this.prismaService.usuarios.findUnique({
          where: {
            email,
          },
        });
      
        // Si el usuario ya existe, lanzar una excepción con un código 409 (Conflicto)
        if (usuarioExistente) {
          throw new HttpException("El usuario ya existe, no puede registrar.", 409);
        }
      
        // Crear un nuevo usuario en la base de datos
        const usuario = await this.prismaService.usuarios.create({
          data: {
            email,
            nombre,
            pass: claveencriptada, // Se almacena la contraseña encriptada
          },
        });
      
        // Generar un token JWT para el nuevo usuario registrado
        const token = this.jwtService.sign({
          email: usuario.email,
          nombre: usuario.nombre,
        });
      
        // Devolver el token como resultado del registro
        return token;
      }
      
// Actualizar
async actualizar(id: number, updateUsuario: UpdateUsuario) {
  // Verificar si el usuario existe utilizando el ID
  const usuarioExistente = await this.prismaService.usuarios.findUnique({
    where: {
      usuarioId: id,
    },
  });

  if (!usuarioExistente) {
    throw new HttpException("El usuario no existe, no se puede actualizar.", 404);
  }

  let usuarioActualizado;

  // Verificar si la nueva contraseña se proporciona y no es nula
  if (updateUsuario.pass !== undefined && updateUsuario.pass !== null) {
    // Realizar la actualización utilizando el ID y los datos de actualización
    const claveencriptada = await bcrypt.hash(updateUsuario.pass, 10);

    usuarioActualizado = await this.prismaService.usuarios.update({
      where: {
        usuarioId: id,
      },
      data: {
        nombre: updateUsuario.nombre,
        email: updateUsuario.email,
        pass: claveencriptada,
      },
    });
  } else {
    // Si la nueva contraseña no se proporciona, actualiza sin cambiar la contraseña existente del usuario
    usuarioActualizado = await this.prismaService.usuarios.update({
      where: {
        usuarioId: id,
      },
      data: {
        nombre: updateUsuario.nombre,
        email: updateUsuario.email,
      },
    });
  }

  if (usuarioActualizado) {
    const token = this.jwtService.sign({
      email: usuarioActualizado.email,
      nombre: usuarioActualizado.nombre,
    });
    return token;
  } else {
    // Manejar el caso en el que usuarioActualizado es null o undefined
    throw new HttpException("No se pudo actualizar el usuario.", 500);
  }
}

//-----------------------------------------------------------------


}
