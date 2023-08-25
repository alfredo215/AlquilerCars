import { IsNotEmpty,IsEmail,IsString,MinLength } from "class-validator"
export class CreateUsuarioDto {
    @IsNotEmpty({message:'El email no puede estar vacio'})
    @IsEmail({},{message:'El email no es válido'})    
    email:string


    @IsString({message:'El nombre debe ser una cadena de texto'})
    nombre:string


    @IsNotEmpty({message:'La clave no puede estar vacía'})
    @MinLength(8,{message:'La clave debe tener al menos 8 caracteres'})
    pass:string
}
