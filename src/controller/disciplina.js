const Disciplina = require("../models/Disciplina.js");



module.exports = {
  async getAll(req, res) {
    try {
      let disciplinas = await Disciplina.findAll();
      res.status(200).json(disciplinas);
    } catch (error) {
      console.error("Erro ao buscar os disciplinas:", error);
      res.status(500).json({ error: "Erro ao buscar os disciplinas" });
    }
  },

  async create(req, res) {
    try {
      const { nome, periodo, curso_id } = req.body;
      let novaDisciplina = await Disciplina.create({
        nome,
        periodo,
        curso_id,
      });
      console.log("Nova disciplina criada:", novaDisciplina);

      res.status(201).json(novaDisciplina);
    } catch (error) {
      console.error("Erro ao criar disciplina:", error);
      res.status(500).json({ error: "Erro ao criar disciplina" });
    }
  },

  async update(req, res) {
    try {
      let id = req.params.id;
      let { nome, periodo, curso_id } = req.body;
      let disciplinas = await Disciplina.findByPk(id);
      if (disciplinas) {
        disciplinas.nome = nome ? nome : disciplinas.nome;
        disciplinas.periodo = periodo ? periodo : disciplinas.periodo;
        disciplinas.curso_id = curso_id ? curso_id : disciplinas.curso_id;
        await disciplinas.save();
        res.status(200).json(disciplinas);
      } else {
        res.status(404).json({ error: "Disciplina não encontrada" });
      }
    } catch (error) {
      console.error("Erro ao atualizar disciplina:", error);
      res.status(500).json({ error: "Erro ao atualizar disciplina" });
    }
  },

  async delete(req, res) {
    try {
      let id = req.params.id;
      let disciplinas = await Disciplina.findByPk(id);
      if (disciplinas) {
        await disciplinas.destroy();
        res.status(200).json({ message: "Disciplina deletada com sucesso" });
      } else {
        res.status(404).json({ error: "Disciplina não encontrada" });
      }
    } catch (error) {
      console.error("Erro ao deletar disciplina:", error);
      res.status(500).json({ error: "Erro ao deletar disciplina" });
    }
  },
};
