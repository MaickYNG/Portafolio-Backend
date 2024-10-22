const express = require("express");
const  User  = require("../models/UserSchema");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;


router.post("/login", async (req, res) => {
  
  const user = await User.findOne({
    username: req.body.username,
    status: true,
  });
  

  if (!user || !(await bcrypt.compare(`${req.body.password}`, user.password))) {
    
    res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    return;
  }

  const payload = { username: user.username, fullname: user.fullname };
  const accessToken = jwt.sign(payload, secretKey, {
    expiresIn: "1h",
  });
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
    })
    .json({ message: "Ingreso exitoso", user: payload });
});

router.get("/logout", async (req, res) => {
  res.clearCookie("accessToken").json({ message: "Sesión de usuario cerrada" });
});

module.exports = router;


