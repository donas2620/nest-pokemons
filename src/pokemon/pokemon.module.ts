import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

/*
  Una vez que hemos terminado nuestra entidad pasamos a importarla como un feature de Mongoose especificando
  el nombre (de la clase no el name como valor que definimos en el esquema) y el esquema que definimos
  en la misma entidad
*/

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name, /* Se trata del nombre de la clase no del nombre de variable en la base de datos*/
        schema: PokemonSchema,
      },
    ])
  ]
})
export class PokemonModule {}
