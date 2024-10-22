const { validationResult } = require("express-validator")
const networkModel =require("../models/networkSchema")


const networkGuardar =(req,res)=>{
    console.log(req.body)
    try{
        const objeto = new networkModel(req.body)
        objeto.save()
        res.status(200).json("network guardada con exito")
    }catch(err){
        res.status(400).json("error" , err)
    }
   


}

const networkActualizar =async (req,res)=>{

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
       const rta = await networkModel.updateOne(
        {_id: id},
        {$set: objeto},
        {new: true}
       )
       res.status(200).json({message:"network actualizada Actualizado"})

    }catch(err){
        res.status(400).json({"error" : err})
    }
}

const networkEliminar= async (req,res)=>{

    try{
        const id = req.params.id
        const rta = await networkModel.deleteOne({_id : id})
        res.status(200).json({"message": "network eliminada con exito"})

    }catch(err){
        res.status(400).json("error", err)
    }
    
    
}


const networkListar = async(req,res)=>{
    const network = await networkModel.find()
    console.log (network)
    res.status(200).json(network)
}

module.exports ={
    networkGuardar,
    networkActualizar,
    networkEliminar,
    networkListar
}