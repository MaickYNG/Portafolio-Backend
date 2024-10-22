const express = require ("express")
const router = express.Router()
const section = require("../models/sectionSchema")
const {check} = require ("express-validator")
const authenticateToken = require("../middleware/validate-auth");
const refreshCookie = require("../middleware/refresh-cookie");

router.get('/', async (req, res) => {
  let perPage = req.query.per_page || "5";
  perPage= parseInt(perPage)
  let page = req.query.page || "1";
  page = parseInt(page)
    try {
      const sections = await section.find({ status: true })
      .find({ status: true })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort({ updatedAt: "desc" });
      res.json({ items: sections, page, next: page + 1, prev: page - 1 });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.get('/:id', authenticateToken, refreshCookie, async (req, res) => {
    const sections = await section.findById(req.params.id)
  res.json(sections)
})

router.post('/', authenticateToken, refreshCookie, async (req, res) => {
    date = new Date()
    const sections = section({
      ...req.body,
      createdAt: date,
      updatedAt: date,
      createdBy: '',
      updatedBy: ''
    })
    await sections.save()
    res.json({ 'message': 'Creado con éxito', data: sections })
  })


router.patch('/:id', authenticateToken, refreshCookie, async (req, res) => {
  date = new Date()
  const sections = await section.findById(req.params.id)
  sections.titulo = req.body.titulo
  sections.texto= req.body.texto
  sections.imagen = req.body.imagen
  sections.updatedAt = req.body.updatedAt
  sections.updatedBy = ''
  await sections.save()
  res.json({ 'message': 'Actualizado con éxito', data: sections })
})
 

router.delete('/:id', authenticateToken, refreshCookie, async (req, res) => {
  date = new Date()
  const sections = await section.findById(req.params.id)
  sections.status = false
  sections.updatedAt = req.body.updatedAt
  sections.updatedBy = ''
  await sections.save()
  res.json({ 'message': 'Eliminado con éxito', data: sections })
})


module.exports = router