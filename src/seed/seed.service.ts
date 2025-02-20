import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-responsse.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  

  constructor(
      @InjectModel( Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>,
      private readonly http: AxiosAdapter //Se elimina la dependencia de axios haciendo un custom provider donde se encuentra la inyección de axios
    ){}


  async executeSeed(){
    await this.pokemonModel.deleteMany({}); //Delete * from pokemons

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=20');
    const pokemonToInsert: {name: string, no: number}[] = [];


    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      //const pokemon = await this.pokemonModel.create({name, no});
      pokemonToInsert.push({name, no})
    });

    await this.pokemonModel.insertMany(pokemonToInsert); 
    return 'Seed executed';
  }
}
