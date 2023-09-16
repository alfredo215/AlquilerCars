import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from 'src/AUTH/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@Controller('usuarios')
//@UseGuards(JwtAuthGuard)
//---------------
@ApiTags('Usuarios')  // Añade etiquetas para Swagger
@ApiBearerAuth()
//---------------
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
