const Curso = require("../models/Curso.js");



module.exports = {
  async getAll(req, res) {
    try {
      let cursos = await Curso.findAll();
      res.status(200).json(cursos);
    } catch (error) {
      console.error("Erro ao buscar os cursos:", error);
      res.status(500).json({ error: "Erro ao buscar os cursos" });
    }
  },

  async create(req, res) {
    try {
      const { nome } = req.body;
      let novoCurso = await Curso.create({
        nome,
      });
      console.log("Novo curso criado:", novoCurso);

      res.status(201).json(novoCurso);
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      res.status(500).json({ error: "Erro ao criar curso" });
    }
  },

  async update(req, res) {
    try {
      let id = req.params.id;
      let { nome } = req.body;
      let cursos = await Curso.findByPk(id);
      if (cursos) {
        cursos.nome = nome ? nome : cursos.nome;
        await cursos.save();
        res.status(200).json(cursos);
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ error: "Erro ao atualizar curso" });
    }
  },
  async delete(req, res) {
    try {
      let id = req.params.id;
      let cursos = await Curso.findByPk(id);
      if (cursos) {
        await cursos.destroy();
        res.status(200).json({ message: "Curso deletado com sucesso" });
      } else {
        res.status(404).json({ error: "Curso não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
      res.status(500).json({ error: "Erro ao deletar curso" });
    }
  },
};
