import { HttpException, Injectable } from '@nestjs/common';
import { CreateRentaDto } from './dto/create-renta.dto';
import { UpdateRentaDto } from './dto/update-renta.dto';
import * as jwt from 'jsonwebtoken';
import { CreateRenta } from './interface/create-renta.interface';
import { UpdateRenta } from './interface/update-renta.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RentasService {
  constructor(private readonly prismaService: PrismaService) {}
  //----------------------------------------------------------------------------
  async create({ cliente, dui, fecha, carro_modelo, placa, color, estado, usuarioId_FK }: CreateRenta) {
    // Convierte la cadena de fecha en un objeto Date (solo la fecha, sin hora)
    const fechaDate = new Date(fecha);
  
    // Ajusta la fecha para evitar problemas de zona horaria
    fechaDate.setMinutes(fechaDate.getMinutes() + fechaDate.getTimezoneOffset());
  
    // Verifica si la placa ya existe en la base de datos
    const placaExistente = await this.prismaService.renta.findUnique({
      where: {
        placa
      }
    });
  
    if (placaExistente) {
      throw new HttpException("El Vehículo ya existe, no se puede registrar.", 409);
    }
  
    // Crea el nuevo registro de alquiler utilizando Prisma
    const renta = await this.prismaService.renta.create({
      data: {
        cliente,
        dui,
        fecha: fechaDate, // Utiliza la fecha ajustada
        carro_modelo,
        placa,
        color,
        estado,
        usuarioId_FK
      },
    });
  
    // Genera un token con los datos del alquiler (si es necesario)
    const token = jwt.sign(
      { cliente: renta.cliente, modelo: renta.carro_modelo, placa: renta.placa },
      process.env.CLAVE_SECRETA,
      { expiresIn: '36000s' }
    );
  
    return token;
  }
  
//--------------------------------------------------------------------------------
  async findAll() {
    return await this.prismaService.renta.findMany()
  }
//--------------------------------------------------------------------------------
  async findOne(id: number) {
    return await this.prismaService.renta.findUnique({
      where: {
        rentaId: id,
      },
    });
  }
//-----------------------------------------------------------------------------------
async update(id: number, updateRenta: UpdateRenta) {
  // Verifica si el alquiler existe
  const alquilerExistente = await this.prismaService.renta.findUnique({
    where: {
      rentaId: id,
    },
  });

  // Si no se encuentra el alquiler, lanza una excepción
  if (!alquilerExistente) {
    throw new HttpException('Alquiler no encontrado.', 404);
  }

  // Convierte la cadena de fecha en un objeto Date (solo la fecha, sin hora)
  const fecha = new Date(updateRenta.fecha);

  // Ajusta la fecha para evitar problemas de zona horaria
  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());

  // Realiza la actualización utilizando la función update de Prisma
  const alquilerActualizado = await this.prismaService.renta.update({
    where: {
      rentaId: id,
    },
    data: {
      cliente: updateRenta.cliente,
      dui: updateRenta.dui,
      fecha: fecha, // Utiliza la fecha ajustada
      estado: updateRenta.estado,
      usuarioId_FK: updateRenta.usuarioId_FK,
    },
  });

  // Genera un token con los datos actualizados (si es necesario)
  const token = jwt.sign(
    {
      cliente: alquilerActualizado.cliente,
      dui: alquilerActualizado.dui,
      fecha: alquilerActualizado.fecha,
      estado: alquilerActualizado.estado,
      usuarioId_FK: alquilerActualizado.usuarioId_FK,
    },
    process.env.CLAVE_SECRETA,
    { expiresIn: '36000s' },
  );

  return token;
}
//-----------------------------------------------------------------------------
 // Eliminar
 async remove(id: number): Promise<string> {
  // Encuentra al usuario que se va a eliminar
  const renta = await this.prismaService.renta.findUnique({
    where: {
      rentaId: id,
    },
  });

  // Si no se encuentra al usuario, lanza una excepción
  if (!renta) {
    throw new HttpException("Vehiculo no encontrado.", 404);
  }

  // Genera un token JWT con los datos del usuario
  const token = jwt.sign(
    { cliente: renta.cliente, modelo: renta.carro_modelo, placa: renta.placa },
    process.env.CLAVE_SECRETA,
    { expiresIn: '36000s' }
  );

  // Elimina al usuario
  await this.prismaService.renta.delete({
    where: {
      rentaId: id,
    },
  });

  // Devuelve el token generado
  return token;
}

}
