const express = require ("express")
const router = express.Router()
const project = require("../models/projectSchema")
const {check} = require ("express-validator")
const authenticateToken = require("../middleware/validate-auth");
const refreshCookie = require("../middleware/refresh-cookie");


router.get('/', async (req, res) => {
  let perPage = req.query.per_page || "5";
  perPage= parseInt(perPage)
  let page = req.query.page || "1";
  page = parseInt(page)
    try {
      const projects = await project.find({ status: true })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort({ updatedAt: "desc" });

      res.json({ items: projects, page, next: page + 1, prev: page - 1 });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.get('/:id', async (req, res) => {
    const projects = await project.findById(req.params.id)
  res.json(projects)
})

router.post('/', authenticateToken, refreshCookie, async (req, res) => {
    date = new Date()
    const projects = project({
      ...req.body,
      createdAt: date,
      updatedAt: date,
      createdBy: '',
      updatedBy: ''
    })
    await projects.save()
    res.json({ 'message': 'Creado con éxito', data: projects })
  })


router.patch('/:id', authenticateToken, refreshCookie, async (req, res) => {
  date = new Date()
  const projects = await project.findById(req.params.id)
  projects.proyecto = req.body.proyecto
  projects.tecnologias = req.body.tecnologias
  projects.funciones = req.body.funciones
  projects.updatedAt = req.body.updatedAt
  projects.updatedBy = ''
  await projects.save()
  res.json({ 'message': 'Actualizado con éxito', data: projects })
})
 

router.delete('/:id', authenticateToken, refreshCookie, async (req, res) => {
  date = new Date()
  const projects = await project.findById(req.params.id)
  projects.status = false
  projects.updatedAt = req.body.updatedAt
  projects.updatedBy = ''
  await projects.save()
  res.json({ 'message': 'Eliminado con éxito', data: projects })
})



module.exports = router