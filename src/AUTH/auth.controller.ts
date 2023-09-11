import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { LoginUsuarioDto } from '../usuarios/dto/login-usuario.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';


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

// Actializar
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Añade la autenticación
  //----------------------------------------------------  
  @Patch('/actualizar/:id') // Define la ruta para el método PATCH, utiliza el ID del usuario como parámetro
  actualizar(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    // Llama a la función de actualización en el servicio y pasa el ID y los datos de actualización
    return this.usuariosService.actualizar(+id, updateUsuarioDto);
  }
  /*

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  */

}
