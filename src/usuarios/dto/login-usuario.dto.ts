import { IsNotEmpty,IsEmail,MinLength } from "class-validator"
export class LoginUsuarioDto {
    @IsNotEmpty({message:'El email no puede estar vacio'})
    @IsEmail({},{message:'El email no es válido'})    
    email:string


    @IsNotEmpty({message:'La clave no puede estar vacía'})
    @MinLength(8,{message:'La clave debe tener al menos 8 caracteres'})
    pass:string
}
