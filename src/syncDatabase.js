const Curso = require('./models/Curso');
const Usuario = require('./models/Usuario');
const Disciplina = require('./models/Disciplina');
const Pergunta = require('./models/Pergunta');
const Resposta = require('./models/Resposta');
const Comentario = require('./models/Comentario');

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