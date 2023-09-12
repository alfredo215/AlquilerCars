import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty,IsString,IsDate,MaxLength,IsNumber, IsDateString, MinLength, IsISO8601 } from "class-validator"
import { CreateRentaDto } from './create-renta.dto';

export class UpdateRentaDto extends PartialType(CreateRentaDto) {
    @IsNotEmpty({message:'El cliente no puede estar vacio'})
    @IsString({message:'El nombre debe ser una cadena de texto'})
    cliente: string;
  
    @IsNotEmpty({message:'El Dui no puede estar vacio'})
    @IsString({message:'El Dui debe ser una cadena de tipo numerico'})
    @MaxLength(9,{message:'El Dui debe tener 9 digitos'})
    @MinLength(9,{message:'El Dui debe tener 9 digitos'})
    dui: string;
  
    @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
    @IsString({ message: 'La fecha debe ser una cadena de texto' })
    @IsISO8601({ strict: true }, { message: 'La fecha debe estar en formato ISO 8601' })
    fecha: string;
  
    @IsNotEmpty({message:'El carro no puede estar vacio'})
    @IsString({message:'El carro debe ser una cadena de texto'})
    carro_modelo: string;
  
    @IsNotEmpty({message:'La placa no puede estar vacia'})
    @IsString({message:'La placa debe ser una cadena de texto'})
    placa: string;
  
    @IsNotEmpty({message:'El color no puede estar vacio'})
    @IsString({message:'El color debe ser una cadena de texto'})
    color: string;
  
    @IsNotEmpty({message:'El estado no puede estar vacio'})
    @IsString({message:'El estado debe ser una cadena de texto'})
    estado: string;

    @IsNotEmpty({message:'El usuario no puede estar vacio'})
    usuarioId_FK: number;


}
