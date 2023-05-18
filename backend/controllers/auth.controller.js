import { User } from "../models/user.js";


export const register  = async (req, res) => {
    const {email, tutorial, billetera} = req.body
    try {
        const user = new User({email, tutorial, billetera});
        await user.save();

        return res.json({ok: true})  
    } catch (error) {
        console.log(error, "no se puedo");

    }
}

export const tutoriales =  async (req, res) => {
    req.json()
}
