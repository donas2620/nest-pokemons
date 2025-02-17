import { Module } from '@nestjs/common';
import {ServeStaticModule} from '@nestjs/serve-static'
import {join} from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import {MongooseModule} from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

/* En este modulo realiza las importaciones de mongoose que me ayudan a conectar mongo con Nest,
   en caso de existir credenciales se ingresarian en este apartado
*/

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..' ,'public'),
      }),

    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'), /* Se coloca mongodb con el puerto y se especifica*/

    PokemonModule, CommonModule 
  ],

})
export class AppModule {}

