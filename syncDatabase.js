const Curso = require('./src/models/Curso');
const Usuario = require('./src/models/Usuario');
const Disciplina = require('./src/models/Disciplina');
const Pergunta = require('./src/models/Pergunta');
const Resposta = require('./src/models/Resposta');
const Comentario = require('./src/models/Comentario');

function syncDatabase() {
    return Promise.all([
        Curso.sync(),
        Usuario.sync(),
        Disciplina.sync(),
        Pergunta.sync(),
        Resposta.sync(),
        Comentario.sync()
    ]).then(() => {
        console.log('Tabelas criadas com sucesso');
    }).catch((error) => {
        console.error('Erro na criação das tabelas', error);
    });
}

module.exports = syncDatabase;