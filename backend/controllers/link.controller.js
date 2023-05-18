import { Wiki } from "../models/WikiW3b.js";

//ver todos los tutoriales
export const getTutoriales = async(req, res) => {
    try {
        const wiki = await Wiki.find()

       return res.json({wiki}) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'error de servidor'})
    }
    
}


//ver solo un tutorial
export const getTutorial = async (req, res) => {
    try {
        const {title} = req.params;
        const tuto = await Wiki.findOne({title});
        console.log(tuto);

        if(!tuto) 
        return res.status(404).json({error:'No existe este tutorial'})

       return res.json({tuto}) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'error de servidor'})
    }
} 


//Eliminar tutorial
export const deleteTutorial = async (req, res) => {
    try {
        const {title} = req.params;
        const tuto = await Wiki.findOne({title});

        if(!tuto) return res.status(404).json({error:'No existe este tutorial'})

        await tuto.deleteOne();

       return res.json({tuto}); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'error de servidor'})
    }
} 



//Agregar los tutoriales
export const createTutoriales = async (req, res) => {
    try {
        const {title, tutorial, billetera} = req.body;

        const tuto = new Wiki({title, tutorial, billetera});
        const newWiki = await tuto.save()

        return res.json({newWiki});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'error de servidor no deja guardar'})
    }
}

