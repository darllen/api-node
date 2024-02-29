const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());


const protocolo = process.env.PROTOCOL || "http";

const ip = require('ip');
const ip_adress = ip.address();

const porta = process.env.PORT || 3030;


// CONECTAR COM O BANCO
const routes = require('./routes');
app.use(routes)
 
app.listen(porta, () => console.log(`Server started in http://localhost:${porta} or ${protocolo}://${ip_adress}:${porta}`));