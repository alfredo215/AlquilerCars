import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { RentasService } from './rentas.service';
import { CreateRentaDto } from './dto/create-renta.dto';
import { UpdateRentaDto } from './dto/update-renta.dto';
import { JwtAuthGuard } from 'src/AUTH/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('rentas')
@UseGuards(JwtAuthGuard)
//---------------
@ApiTags('Rentas')  // Añade etiquetas para Swagger
@ApiBearerAuth()
export class RentasController {
  constructor(private readonly rentasService: RentasService) {}
  @Post()
  async create(@Body() createRentaDto: CreateRentaDto) {
    // Convierte la cadena de fecha a un objeto Date
    const fecha = new Date(createRentaDto.fecha);

    // Luego, crea una instancia de Renta
    const renta = await this.rentasService.create({
      ...createRentaDto,
      fecha, // Asigna la fecha convertida aquí
    });

    return renta;
  }
//----------------------------------------------------------------------------
  @Get()
async findAll() {
  const rentas = await this.rentasService.findAll();

  // Formatea la fecha en cada objeto de renta
  const rentasFormateadas = rentas.map((renta) => {
    return {
      ...renta,
      fecha: renta.fecha.toLocaleDateString(),
    };
  });

  return rentasFormateadas;
}
//----------------------------------------------------------------------------
@Get(':id')
async findOne(@Param('id') id: string) {
  const renta = await this.rentasService.findOne(+id);

  // Verifica si la renta existe
  if (!renta) {
    // Puedes lanzar una excepción 404 si no se encuentra la renta
    throw new NotFoundException('Renta no encontrada');
  }

  // Formatea la fecha en la renta
  const rentaFormateada = {
    ...renta,
    fecha: renta.fecha.toLocaleDateString(),
  };

  return rentaFormateada;
}
//------------------------------------------------------------------------
  @Patch(':id')
update(@Param('id') id: string, @Body() updateRentaDto: UpdateRentaDto) {
  // Convierte la cadena de fecha a un objeto Date
  const fecha = new Date(updateRentaDto.fecha);

  // Llama al servicio con la fecha convertida
  return this.rentasService.update(+id, { ...updateRentaDto, fecha });
}


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentasService.remove(+id);
  }
}
