const router = require('express').Router();
const useController = require('./controller');



// incluir produtos
router.post('/create', useController.create);

// todos os produtos
router.get('/api', useController.getAll);

// pegar produto por ID
router.get('/api/:id', useController.getProduct);

// atualizar produto
router.put('/api/update/:id', useController.update); 

// deletar produto por ID
router.delete('/api/delete/:id', useController.delete);


module.exports = router;
