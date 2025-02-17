import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

/* Dentro de la entidad que define como se vera la información en mi base de datos
   defino que se extiende a Document de "mongoose" para hacer la conexión a Mongo
   usamos el decorador "Schema" para definir el esquema y el decorador "Props"
   para definir las propiedades de cada una de las variables que estaran en mi tabla de
   pokemon, en este caso que sean unicas.
   Finalmente exportamos el esquema para usarlo en nuestro modulo y exportarlo a otros modulos
*/

@Schema()
export class Pokemon extends Document{
    @Prop({
        unique: true,
        index: true,
    })
    name: string;
    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
