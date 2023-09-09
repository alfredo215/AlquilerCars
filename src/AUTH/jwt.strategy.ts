import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){


    constructor(private readonly prismaService:PrismaService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.CLAVE_SECRETA
        });
    }


    async validate(payload:{email:string}){


        const usuarioExistente= await this.prismaService.usuarios.findUnique({
            where:{
              email:payload.email
            }
          })
          return usuarioExistente;
    }
}
