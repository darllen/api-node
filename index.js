const express = require('express')
const app = express()
const env = require("dotenv")

env.config()
app.use(express.json());


const protocolo = process.env.PROTOCOL || "http";

const ip = require('ip');
const ip_adress = ip.address();

const porta = process.env.PORT || 3030;


const syncDatabase = require("./syncDatabase.js");
syncDatabase().then(()=>{
    console.log("Tabelas criadas")
}).catch((err)=> {
    console.log("Erro: ", err)
})

// Conectar com o banco
const routes = require("./src/routes/routes.js")
app.use(routes)


app.listen(porta, () => console.log(`Server started in http://localhost:${porta} or ${protocolo}://${ip_adress}:${porta}`));