const express = require ("express")
const router = express.Router()
const network = require("../models/networkSchema")
const {check} = require ("express-validator")
const authenticateToken = require("../middleware/validate-auth");
const refreshCookie = require("../middleware/refresh-cookie");

router.get('/', async (req, res) => {
  let perPage = req.query.per_page || "5";
  perPage= parseInt(perPage)
  let page = req.query.page || "1";
  page = parseInt(page)
  
    try {
      const networks = await network.find({ status: true })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort({ updatedAt: "desc" });
      res.json({ items: networks, page,  next: page + 1, prev: page - 1 });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.get('/:id',  async (req, res) => {
    const networks = await network.findById(req.params.id)
  res.json(networks)
})

router.post('/', async (req, res) => {
    date = new Date()
    const networks = network({
      ...req.body,
      createdAt: date,
      updatedAt: date,
      createdBy: '',
      updatedBy: ''
    })
    await networks.save()
    res.json({ 'message': 'Creado con éxito', data: networks })
  })


router.patch('/:id',  async (req, res) => {
  date = new Date()
  const networks = await network.findById(req.params.id)
  networks.nombre = req.body.nombre
  networks.icono = req.body.icono
  networks.enlace= req.body.enlace
  networks.updatedAt = req.body.updatedAt
  networks.updatedBy = ''
  await networks.save()
  res.json({ 'message': 'Actualizado con éxito', data: networks })
})
 

router.delete('/:id',  async (req, res) => {
  date = new Date()
  const networks = await network.findById(req.params.id)
  networks.status = false
  networks.updatedAt = req.body.updatedAt
  networks.updatedBy = ''
  await networks.save()
  res.json({ 'message': 'Eliminado con éxito', data: networks })
})
  
  


module.exports = router