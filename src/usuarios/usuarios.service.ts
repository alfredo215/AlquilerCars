import { HttpException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUsuario } from './interface/login-usuario.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuario } from './interface/create-usuario.interface';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsuariosService {
  //----------------------------------------
  constructor(private readonly prismaService: PrismaService) {}
  async create({email, nombre, pass}:CreateUsuario) {
    const claveencriptada= await  bcrypt.hash(pass,10)

    const usuarioExistente= await this.prismaService.usuarios.findUnique({
      where:{
        email
      }
    })

    if(usuarioExistente){
      throw new HttpException("El usuario ya existe, no puede registrar.",409);
    }


    const usuario=await this.prismaService.usuarios.create({
      data:{
        email,
        nombre,
        pass:claveencriptada
      },
    })

    const token= jwt.sign(
      {email:usuario.email,nombre:usuario.nombre},
      process.env.CLAVE_SECRETA,
      {expiresIn:'36000s'}
      )
    
    return token
  }
//----------------------------------------------------------------------
  async login({email, pass}:LoginUsuario) {
    const claveencriptada= await  bcrypt.hash(pass,10)

    const usuarioExistente= await this.prismaService.usuarios.findUnique({
      where:{
        email
      }
    })

    if(usuarioExistente){
      //comprobar hash de la contraseña
      const passwordCorrecto= await bcrypt.compare(pass,usuarioExistente.pass);
      if(!passwordCorrecto){
        throw new HttpException("La clave es incorrecta.",400);
      }else{
        const token= jwt.sign(
          {email:usuarioExistente.email,nombre:usuarioExistente.nombre},
          process.env.CLAVE_SECRETA,
          {expiresIn:'36000s'}
          )
        
        return token
      }
    }else{
      throw new HttpException("El usuario no existe.",400);
    }


   
  }
  findAll() {
    return `This action returns all usuarios`;
  }

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
