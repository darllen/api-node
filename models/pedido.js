const Sequelize = require('sequelize')
const database = require('../db')
const clientes = require('./cliente')

const Pedido = database.define('Pedido', {
    id_cliente: {
        type: Sequelize.INTEGER(),
        references: {
            model: clientes,
            key: "id"
        },
        allowNull: false,

    },
    data_pedido: {
        type: Sequelize.DATE(),
        allowNull: false,
    },
    status:  {
        type: Sequelize.STRING(50)
    }

})

module.exports = Pedido;