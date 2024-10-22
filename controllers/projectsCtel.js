const { validationResult } = require("express-validator")
const projectModel =require("../models/projectSchema")


const projectGuardar =(req,res)=>{
    console.log(req.body)
    try{
        const objeto = new projectModel(req.body)
        objeto.save()
        res.status(200).json("proyecto guardado con exito")
    }catch(err){
        res.status(400).json("error" , err)
    }
   


}

const projectActualizar =async (req,res)=>{

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
       const rta = await projectModel.updateOne(
        {_id: id},
        {$set: objeto},
        {new: true}
       )
       res.status(200).json({message:"proyecto actualizado correctamente "})

    }catch(err){
        res.status(400).json({"error" : err})
    }
}

const projectEliminar= async (req,res)=>{

    try{
        const id = req.params.id
        const rta = await projectModel.deleteOne({_id : id})
        res.status(200).json({"message": "proyecto eliminado con exito"})

    }catch(err){
        res.status(400).json("error", err)
    }
    
    
}


const projectListar = async(req,res)=>{
    const experiences = await projectModel.find()
    console.log (experiences)
    res.status(200).json(experiences)
}

module.exports ={
    projectGuardar,
    projectActualizar,
    projectEliminar,
    projectListar
}