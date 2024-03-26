const Sequelize = require('sequelize')
const database = require('../db')


const Categoria = database.define('Categoria', {
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    descricao : {
        type: Sequelize.TEXT,
        
    }
});



module.exports = Categoria;