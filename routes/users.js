const express = require ("express")
const router = express.Router()
const user = require("../controllers/usersCtel")
const {check} = require ("express-validator")

router.get("/",//(req,res)=>{

    user.userListar
)


router.post("/",
    user.userGuardar
)


{/*router.put("/", 
    [
        check("user", "Registra un mombre valido").not().isEmpty()
    ]

    ,user.userActualizar
)*/}


router.delete("/:id",
    user.userEliminar
)


module.exports = router