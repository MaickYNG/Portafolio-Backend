const { validationResult } = require("express-validator")
const sectionModel =require("../models/sectionSchema")


const sectionGuardar =(req,res)=>{
    console.log(req.body)
    try{
        const objeto = new sectionModel(req.body)
        objeto.save()
        res.status(200).json("seccion guardada con exito")
    }catch(err){
        res.status(400).json("error" , err)
    }
   


}

const sectionActualizar =async (req,res)=>{

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

const sectionEliminar= async (req,res)=>{

    try{
        const id = req.params.id
        const rta = await sectionModel.deleteOne({_id : id})
        res.status(200).json({"message": "seccion eliminada con exito"})

    }catch(err){
        res.status(400).json("error", err)
    }
    
    
}


const sectionListar = async(req,res)=>{
    const sections = await sectionModel.find()
    console.log (sections)
    res.status(200).json(sections)
}

module.exports ={
    sectionGuardar,
    sectionActualizar,
    sectionEliminar,
    sectionListar
}