import mongoose from "mongoose";
const {Schema, model} = mongoose

const wikiSchema = new Schema({
    title : {
        type: String,
        require: true,
    },
    tutorial: {
        type: String,
        require: true,
    },
    billetera: {
        type: String,
        ref: 'User',
        require: true,
        unique: true,
       /*  validate: {
            validator: Number.isInteger,
            message: '{VALUE} no es un número entero válido'
          } */
    }
})


export const Wiki = model('Wiki', wikiSchema)