const mongoose = require ("mongoose")

const tecnologiSchema = mongoose.Schema(
    { updatedAt: { // fecha de actualización del documento
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
        nombre:{
            type: String,
            require : true,
            trim :true
        },
        icono: {
            type: String,
            require : true,
            trim: true
        },
        status: {
            type: Boolean,
            require: true,
            default: true
          }
    }
)

module.exports = mongoose.model('tecnology', tecnologiSchema);