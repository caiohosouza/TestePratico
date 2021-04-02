const router = require('express-promise-router')();
const alunoCursoController = require('../controllers/aluno_curso.controller');

router.post('/alunoCursos', alunoCursoController.createAlunoCurso);

router.get('/alunoCursos/:id', alunoCursoController.listAllCursosByAluno);

module.exports = router;