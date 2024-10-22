const mongoose= require("mongoose")
//const URIDB = "mongodb+srv://maicolamerica12:123!@cluster0.q6e47.mongodb.net/portfolio?retryWrites=true&w=majority"
const URIDB2 ="mongodb+srv://maicolamerica12:123!@cluster0.q6e47.mongodb.net/portafolio?retryWrites=true&w=majority";


const connectDB = async ()=> {
    try{
        await mongoose.connect(URIDB2)
        console.log("conexion satisfactoria")
    }catch(err){
        console.log.apply("error de conexxion", err)
    }
}

module.exports = connectDB