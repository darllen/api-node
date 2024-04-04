const Sequelize = require("sequelize");
const sequelize = require("../database/database");



sequelize
    .authenticate()
    .then(function() {
        console.log('Conectado');
    })
    .catch(function (erro) {
        console.log('Erro ao conectar: ' + erro);
    });

const Curso = sequelize.define('Cursos', {
    nome: {
        type: Sequelize.STRING(45),
        allowNull: false
    }
    });

module.exports = Curso;
