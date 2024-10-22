const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const tecnology = require("../models/tecnologiesSchema");
const authenticateToken = require("../middleware/validate-auth");
const refreshCookie = require("../middleware/refresh-cookie");

router.get("/", async (req, res) => {
  let perPage = req.query.per_page || "5";
  perPage= parseInt(perPage)
  let page = req.query.page || "1";
  page = parseInt(page)
  try {
    const tecnologies = await tecnology
      .find({ status: true })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort({ updatedAt: "desc" });
    res.json({ items: tecnologies, page, next: page + 1, prev: page - 1 });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id",  async (req, res) => {
  const tecnologies = await tecnology.findById(req.params.id);
  res.json(tecnologies);
});

router.post("/", async (req, res) => {
  date = new Date();
  const tecnologies = tecnology({
    ...req.body,
    createdAt: date,
    updatedAt: date,
    createdBy: "",
    updatedBy: "",
  });
  await tecnologies.save();
  res.json({ message: "Creado con éxito", data: tecnologies });
});

router.patch("/:id", async (req, res) => {
  date = new Date();
  const tecnologies = await tecnology.findById(req.params.id);
  tecnologies.nombre = req.body.nombre;
  tecnologies.icono = req.body.icono;
  tecnologies.imageUrl = req.body.imageUrl;
  tecnologies.updatedAt = req.body.updatedAt;
  tecnologies.updatedBy = "";
  await tecnologies.save();
  res.json({ message: "Actualizado con éxito", data: tecnologies });
});

router.delete("/:id",  async (req, res) => {
  date = new Date();
  const tecnologies = await tecnology.findById(req.params.id);
  tecnologies.status = false;
  tecnologies.updatedAt = req.body.updatedAt;
  tecnologies.updatedBy = "";
  await tecnologies.save();
  res.json({ message: "Eliminado con éxito", data: tecnologies });
});

module.exports = router;
