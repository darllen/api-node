const dotenv = require('dotenv');
const express = require("express");
const app = express();
const database = require('./db');

const Pedido = require('./models/pedido');
const Produto = require('./models/produto');
const Categoria = require('./models/categoria')
const Cliente = require('./models/cliente')
const ItemPedido = require('./models/item_pedido')

dotenv.config();

app.use(express.json());

database.authenticate()
  .then(() => {
    console.log('Conectado ao MySQL');
  })
  .catch( err => {
    console.log('Erro ao conectar com o MySQL', err.message);
  });

database.sync()
  .then(() => {
    console.log('Tabelas criadas')
  })
  .catch( err => {
    console.log('Erro ao sincronizar modelos: ', err)
  });


//Sincronizando modelos e a conexão
module.exports = {
  database,
  Categoria,
  Produto,
  Cliente,
  Pedido,
  ItemPedido
};


app.listen(() => {
  console.log(`Server started in http://localhost:${process.env.PORT}`);
});
