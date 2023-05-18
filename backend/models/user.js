import mongoose from "mongoose";
import {Schema, model} from "mongoose";

const userSchema = new mongoose.Schema ({
    email : {
        type: String
    },
    tutorial: {
        type: String
    },
    billetera: {
        type: Number
    }
})


export const User = mongoose.model('User', userSchema);