const Pergunta = require("../models/Pergunta.js");



module.exports = {
  async getAll(req, res) {
    try {
      let perguntas = await Perguntas.findAll();
      res.status(200).json(perguntas);
    } catch (error) {
      console.error("Erro ao buscar as pertguntas:", error);
      res.status(500).json({ error: "Erro ao buscar as perguntas" });
    }
  },

  async create(req, res) {
    try {
      const { descricao, usuario_id, disciplina_id } = req.body;
      let novaPergunta = await Pergunta.create({
        descricao,
        usuario_id,
        disciplina_id,
      });
      console.log("Nova pergunta criada:", novaPergunta);

      res.status(201).json(novaPergunta);
    } catch (error) {
      console.error("Erro ao criar pergunta:", error);
      res.status(500).json({ error: "Erro ao criar pergunta" });
    }
  },

  async update(req, res) {
    try {
      let id = req.params.id;
      let { descricao, usuario_id, disciplina_id } = req.body;
      let perguntas = await Pergunta.findByPk(id);
      if (perguntas) {
        perguntas.descricao = descricao ? descricao : perguntas.descricao;
        perguntas.usuario_id = usuario_id ? usuario_id : perguntas.usuario_id;
        perguntas.disciplina_id = disciplina_id
          ? disciplina_id
          : perguntas.disciplina_id;
        await perguntas.save();
        res.status(200).json(perguntas);
      } else {
        res.status(404).json({ error: "Pergunta não encontrada" });
      }
    } catch (error) {
      console.error("Erro ao atualizar pergunta:", error);
      res.status(500).json({ error: "Erro ao atualizar pergunta" });
    }
  },

  async delete(req, res) {
    try {
      let id = req.params.id;
      let perguntas = await Pergunta.findByPk(id);
      if (perguntas) {
        await perguntas.destroy();
        res.status(200).json({ message: "Pergunta deletada com sucesso" });
      } else {
        res.status(404).json({ error: "Pergunta não encontrada" });
      }
    } catch (error) {
      console.error("Erro ao deletar Pergunta:", error);
      res.status(500).json({ error: "Erro ao deletar pergunta" });
    }
  },
};
