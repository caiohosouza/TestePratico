const router = require('express-promise-router')();
const alunoController = require('../controllers/aluno.controller');

//Crud

router.post('/alunos', alunoController.createAluno);

router.get('/alunos', alunoController.listAllAlunos);

router.get ('/alunos/:id', alunoController.findAlunoById);

router.put('/alunos/:id', alunoController.updateAlunoById);

router.delete('/alunos/:id', alunoController.deleteAlunoById);

module.exports = router;