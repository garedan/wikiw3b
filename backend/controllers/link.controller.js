import { Wiki } from "../models/WikiW3b.js";

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


//update tutorial
export const updateTutorial = async (req, res) => {
    try {
        const {title} = req.params;

        const {tutorial} = req.body;
        console.log(tutorial);

        const tuto = await Wiki.findOne({title});
        //const newWiki = await tuto.updateMany()

        tuto.tutorial = tutorial;
        await tuto.save();

        //const tut = new Wiki({tutorial, billetera});
        /* const tut =   {tutorial,billetera};
        const newWiki = await tut.save()
 */
        
       return res.json({tuto}); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'error de servidor'})
    }
}

