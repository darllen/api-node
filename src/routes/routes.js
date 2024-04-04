const router = require('express').Router();

const usuarioController = require("../controller/usuario.js")
const cursoController = require("../controller/curso.js")
const disciplinaController = require("../controller/disciplina.js")
const perguntaController = require("../controller/pergunta.js")
const comentarioController = require("../controller/comentario.js")
const respostaController = require("../controller/resposta.js")


// Comentário
router.post('/comentario', comentarioController.create);
router.get('/comentario', comentarioController.getAll);
router.put('/comentario/:id', comentarioController.update);
router.delete('/comentario/:id', comentarioController.delete);

// Curso
router.post('/curso', cursoController.create);
router.get('/curso', cursoController.getAll);
router.put('/curso/:id', cursoController.update);
router.delete('/curso/:id', cursoController.delete);

// Disciplina
router.post('/disciplina', disciplinaController.create);
router.get('/disciplina', disciplinaController.getAll);
router.put('/disciplina/:id', disciplinaController.update);
router.delete('/disciplina/:id', disciplinaController.delete);

// Pergunta
router.post('/pergunta', perguntaController.create);
router.get('/pergunta', perguntaController.getAll);
router.put('/pergunta/:id', perguntaController.update);
router.delete('/pergunta/:id', perguntaController.delete);

// Resposta
router.post('/resposta', respostaController.create);
router.get('/resposta', respostaController.getAll);
router.put('/resposta/:id', respostaController.update);
router.delete('/resposta/:id', respostaController.delete);

// Usuário
router.post('/usuario', usuarioController.create);
router.get('/usuario', usuarioController.getAll);
router.put('/usuario/:id', usuarioController.update);
router.delete('/usuario/:id ', usuarioController.delete);


module.exports = router;
