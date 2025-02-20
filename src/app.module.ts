import { Module } from '@nestjs/common';
import {ServeStaticModule} from '@nestjs/serve-static'
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';

import {join} from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';


/* En este modulo realiza las importaciones de mongoose que me ayudan a conectar mongo con Nest,
   en caso de existir credenciales se ingresarian en este apartado
*/

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    
    }), //Modulo de la dependencia de config de Nest, importamos las configuraciones de entornos de nuestro .env
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..' ,'public'),
      }),

    MongooseModule.forRoot(process.env.MONGODB || 'mongodb://mongo:YUaLAuCQnwjIgCbItraQaOVJKdyVuoTs@maglev.proxy.rlwy.net:49972',
    {
      dbName: 'pokemonsdb'
    } 
    ),
    /* Se coloca mongodb con el puerto y se especifica*/

    PokemonModule, CommonModule, SeedModule 
  ],

})
export class AppModule {
  constructor(){
    //console.log( process.env)
  }
}

