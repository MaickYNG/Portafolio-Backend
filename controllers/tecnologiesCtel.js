const { validationResult } = require("express-validator")
const tecnologiesModel= require ("../models/tecnologiesSchema")



const tecnologiasGuardar =async (req,res)=>{
    const errores = validationResult(req)
    
    if(!errores.isEmpty)
        res.status(401).json({errores: errores.array()})
    try{
        const objeto = new tecnologiesModel(req.body)
        objeto.save()
        res.status(200).json({"message": "Tecnologia guardada"})
    }catch(err){
        res.status(400).json("error" , err)
    }


}

const tecnologiasActualizar =async (req,res)=>{

    try{

       const {id,nombre, logros , desde, hasta}=req.body
       const errores = validationResult(req)

       if(!errores.isEmpty)
        res.status(401).json({errores: errores.array()})
        
       const objeto ={}
       objeto.nombre = nombre
       objeto.logros = logros
       objeto.desde =desde
       objeto.hasta = hasta
       console.log (id,objeto)
       const rta = await sectionModel.updateOne(
        {_id: id},
        {$set: objeto},
        {new: true}
       )
       res.status(200).json({message:"seccion actualizada Actualizado"})

    }catch(err){
        res.status(400).json({"error" : err})
    }
}


const tecnologiaListar = async(req,res)=>{
    const tecnologias = await tecnologiesModel.find()
    console.log (tecnologias)
    res.status(200).json(tecnologias)
}

const tecnologiasEliminar= async (req,res)=>{

    try{
        const id = req.params.id
        const rta = await tecnologiesModel.deleteOne({_id : id})
        res.status(200).json({"message": "dato Eliminado Exito (tecnologia)"})

    }catch(err){
        res.status(400).json("error", err)
    }
    
    
}


    
   


module.exports ={
                    tecnologiasGuardar,
                    tecnologiaListar,
                    tecnologiasEliminar,
                    tecnologiasActualizar

}