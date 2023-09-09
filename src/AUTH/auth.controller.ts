import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { LoginUsuarioDto } from '../usuarios/dto/login-usuario.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@Controller('auth')

//---------------
@ApiTags('Usuarios')  // Añade etiquetas para Swagger

export class AuthController {
  constructor(private readonly usuariosService: AuthService) {}


  @Post('/registrar')
  registrar(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.registrar(createUsuarioDto);
  }


  @Post('/login')
  login(@Body() loginDto: LoginUsuarioDto) {
    return this.usuariosService.login(loginDto);
  }
//------------------------------------------------------
// metodo para autentificarse
@UseGuards(JwtAuthGuard)
@ApiBearerAuth() // Añade la autenticación
  @Get('/mostrar')
  findAll() {
    return this.usuariosService.findAll();
  }

}
