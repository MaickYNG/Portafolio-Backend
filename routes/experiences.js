const express = require ("express")
const router = express.Router()
const experience = require("../models/experienceSchema")
const {check} = require ("express-validator")
const authenticateToken = require("../middleware/validate-auth");
const refreshCookie = require("../middleware/refresh-cookie");

router.get('/', async (req, res) => {
  let perPage = req.query.per_page || "5";
  perPage= parseInt(perPage)
  let page = req.query.page || "1";
  page = parseInt(page)

    try {
      const experiences = await experience.find({ status: true })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort({ updatedAt: "desc" });;
      res.json({ items: experiences, page, next: page + 1, prev: page - 1 });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.get('/:id', authenticateToken, refreshCookie, async (req, res) => {
    const experiences = await experience.findById(req.params.id)
  res.json(experiences)
})

router.post('/', authenticateToken, refreshCookie, async (req, res) => {
    date = new Date()
    const experiences = experience({
      ...req.body,
      createdAt: date,
      updatedAt: date,
      createdBy: '',
      updatedBy: ''
    })
    await experiences.save()
    res.json({ 'message': 'Creado con éxito', data: experiences })
  })


router.patch('/:id', authenticateToken, refreshCookie, async (req, res) => {
  date = new Date()
  const experiences = await experience.findById(req.params.id)
  experiences.nombre = req.body.nombre
  experiences.logros = req.body.logros
  experiences.desde = req.body.desde
  experiences.hasta = req.body.hasta
  experiences.updatedAt = req.body.updatedAt
  experiences.updatedBy = ''
  await experiences.save()
  res.json({ 'message': 'Actualizado con éxito', data: experiences })
})
 

router.delete('/:id', authenticateToken, refreshCookie, async (req, res) => {
  date = new Date()
  const experiences = await experience.findById(req.params.id)
  experiences.status = false
  experiences.updatedAt = req.body.updatedAt
  experiences.updatedBy = ''
  await experiences.save()
  res.json({ 'message': 'Eliminado con éxito', data: experiences })
})

module.exports = router