const Resposta = require("../models/Resposta.js");



module.exports = {
  async getAll(req, res) {
    try {
      let respostas = await Resposta.findAll();
      res.status(200).json(respostas);
    } catch (error) {
      console.error("Erro ao buscar respostas:", error);
      res.status(500).json({ error: "Erro ao buscar respostas" });
    }
  },

  async create(req, res) {
    try {
      const { id_usuario, descricao, pergunta_id } = req.body;
      let novaResposta = await Resposta.create({
        id_usuario,
        descricao,
        pergunta_id,
      });
      console.log("Nova resposta criada:", novaResposta);

      res.status(201).json(novaResposta);
    } catch (error) {
      console.error("Erro ao criar resposta:", error);
      res.status(500).json({ error: "Erro ao criar resposta" });
    }
  },

  async update(req, res) {
    try {
      let id = req.params.id;
      let { id_usuario, descricao, pergunta_id } = req.body;
      let respostas = await Resposta.findByPk(id);
      if (respostas) {
        respostas.id_usuario = id_usuario ? id_usuario : respostas.id_usuario;
        respostas.descricao = descricao ? descricao : respostas.descricao;
        respostas.pergunta_id = pergunta_id
          ? pergunta_id
          : respostas.pergunta_id;
        await respostas.save();
        res.status(200).json(respostas);
      } else {
        res.status(404).json({ error: "Resposta não encontrada" });
      }
    } catch (error) {
      console.error("Erro ao atualizar resposta:", error);
      res.status(500).json({ error: "Erro ao atualizar resposta" });
    }
  },

  async delete(req, res) {
    try {
      let id = req.params.id;
      let respostas = await Resposta.findByPk(id);
      if (respostas) {
        await respostas.destroy();
        res.status(200).json({ message: "Resposta deletada com sucesso" });
      } else {
        res.status(404).json({ error: "Resposta não encontrada" });
      }
    } catch (error) {
      console.error("Erro ao deletar Resposta:", error);
      res.status(500).json({ error: "Erro ao deletar resposta" });
    }
  },
};
