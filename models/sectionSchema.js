
const mongoose = require ("mongoose")

const sectionSchema = mongoose.Schema(
    {
        updatedAt: { // fecha de actualización del documento
            type: Date,
            require: true
          },
          createdAt: { // fecha de creación del documento
            type: Date,
            require: true
          },
          updatedBy: {
            type: String, // usuario que actualizó el documento
            require: true
          },
          createdBy: {
            type: String, // usuario que creó el documento
            require: true
          },
        titulo:{
            type: String,
            require : true,
            trim :true
        },

        texto:{
            type: String,
            require : true,
            trim :true
        },
        imagen:{
            type: String,
        },
        status: {
            type: Boolean,
            require: true,
            default: true
          }
        
        
    }
)

module.exports =mongoose.model("section" , sectionSchema)