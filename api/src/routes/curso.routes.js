const router = require('express-promise-router')();
const cursoController = require('../controllers/curso.controller');

//Crud

router.post('/cursos', cursoController.createCurso);

router.get('/cursos', cursoController.listAllCursos);

router.get ('/cursos/:id', cursoController.findCursoById);

router.put('/cursos/:id', cursoController.updateCursoById);

router.delete('/cursos/:id', cursoController.deleteCursoById);

module.exports = router;