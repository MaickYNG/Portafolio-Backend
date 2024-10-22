const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authCookie = req.cookies["accessToken"];

  // si no existe la cookie de autorización
  if (!authCookie) {
    return res.status(401).json({ message: "Debe iniciar sesión de usuario" });
  }

  // si hay cookie, entonces se verifica su validez
  jwt.verify(authCookie, process.env.JWT_SECRET_KEY, (err, user) => {
    // si ocurre un error con la cookie JWT
    if (err) {
      return res
        .clearCookie("accessToken")
        .status(401)
        .json({ message: "Debe iniciar sesión de usuario" });
    }

    // validar lista negra de tokens

    // If there is no error, continue the execution
    req.jwtDecoded = user;
    next();
  });
}

module.exports = authenticateToken;
