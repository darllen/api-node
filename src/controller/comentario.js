const Comentario = require("../models/Comentario.js");



module.exports = {
  async getAll(req, res) {
    try {
      let comentarios = await Comentario.findAll();
      res.status(200).json(comentarios);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
      res.status(500).json({ error: "Erro ao buscar comentários" });
    }
  },

  async create(req, res) {
    try {
      const { id_usuario, descricao, id_resposta } = req.body;
      let novoComentario = await Comentario.create({
        id_usuario,
        descricao,
        id_resposta,
      });
      console.log("Novo comentário criado:", novoComentario);

      res.status(201).json(novoComentario);
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      res.status(500).json({ error: "Erro ao criar comentário" });
    }
  },

  async update(req, res) {
    try {
      let id = req.params.id;
      let { id_usuario, descricao, id_resposta } = req.body;
      let comentarios = await Comentario.findByPk(id);
      if (comentarios) {
        comentarios.id_usuario = id_usuario
          ? id_usuario
          : comentarios.id_usuario;
        comentarios.descricao = descricao ? descricao : comentarios.descricao;
        comentarios.id_resposta = id_resposta
          ? id_resposta
          : comentarios.id_resposta;
        await comentarios.save();
        res.status(200).json(comentarios);
      } else {
        res.status(404).json({ error: "Comentário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao atualizar comentário:", error);
      res.status(500).json({ error: "Erro ao atualizar comentário" });
    }
  },

  async delete(req, res) {
    try {
      let id = req.params.id;
      let comentarios = await Comentario.findByPk(id);
      if (comentarios) {
        await comentarios.destroy();
        res.status(200).json({ message: "Comentário deletado com sucesso" });
      } else {
        res.status(404).json({ error: "Comentário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao deletar comentário:", error);
      res.status(500).json({ error: "Erro ao deletar comentário" });
    }
  },
};
