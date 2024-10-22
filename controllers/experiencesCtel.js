const { validationResult } = require("express-validator")
const experienciaModel =require("../models/experienceSchema")


const experienciaGuardar =(req,res)=>{
    console.log(req.body)
    try{
        const objeto = new experienciaModel(req.body)
        objeto.save()
        res.status(200).json("Experiencia guardada con exito")
    }catch(err){
        res.status(400).json("error" , err)
    }
   


}

const experienciaActualizar =async (req,res)=>{

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
       const rta = await experienciaModel.updateOne(
        {_id: id},
        {$set: objeto},
        {new: true}
       )
       res.status(200).json({message:"Experiencia actualizada Actualizado"})

    }catch(err){
        res.status(400).json({"error" : err})
    }
}

const experienciaEliminar= async (req,res)=>{

    try{
        const id = req.params.id
        const rta = await experienciaModel.deleteOne({_id : id})
        res.status(200).json({"message": "Experiencia eliminada con exito"})

    }catch(err){
        res.status(400).json("error", err)
    }
    
    
}


const experienciaListar = async(req,res)=>{
    const experiences = await experienciaModel.find()
    console.log (experiences)
    res.status(200).json(experiences)
}

module.exports ={
    experienciaGuardar,
    experienciaActualizar,
    experienciaEliminar,
    experienciaListar
}