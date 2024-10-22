const express = require ("express")
const app = express()
app.use(express.json())
const puerto = 3001
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const db = require("./config/db")
const cors = require("cors");
app.use(cors());
app.use(cookieParser());
const bcrypt = require("bcrypt");
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
const  User  = require("./models/UserSchema");

//const authRoutes = require("./routes/auth");


app.use("/api/tecnologies",require("./routes/tecnologies"))
app.use("/api/experiences", require("./routes/experiences"))
app.use("/api/projects",require("./routes/projects"))
app.use("/api/sections",require("./routes/sections"))
app.use("/api/networks",require("./routes/networks"))
app.use("/api/adm",require("./routes/auth"))





app.listen(puerto,async()=>{
    console.log("Servidor activo Express- BackedRoute Portafolio: " + puerto)

    const count = await User.countDocuments();

  if (!count) {
    const hashAdmin = await bcrypt.hash("Admin_123", 10);
    const hashStd = await bcrypt.hash("Std_123", 10);
    const userAdmin = User({
      username: "admin",
      password: hashAdmin,
      fullname: "Administrador",
      status: true,
    });
    const userStd = User({
      username: "std",
      password: hashStd,
      fullname: "Usuario estándar",
      status: true,
    });
    userAdmin.save();
    userStd.save();
  }
})


db()

