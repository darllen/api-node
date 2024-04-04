const Usuario = require("../models/Usuario.js");



module.exports = {
  async getAll(req, res) {
    try {
      let usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  },

  async create(req, res) {
    try {
      const { nome, email, senha } = req.body;
      let novoUsuario = await Usuario.create({
        nome,
        email,
        senha,
      });
      console.log("Novo usuário criado:", novoUsuario);

      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  },

  async update(req, res) {
    try {
      let id = req.params.id;
      let { nome, email, senha } = req.body;
      let usuarios = await Usuario.findByPk(id);
      if (usuarios) {
        usuarios.nome = nome ? nome : usuarios.nome;
        usuarios.email = email ? email : usuarios.email;
        usuarios.senha = senha ? senha : usuarios.senha;
        await usuarios.save();
        res.status(200).json(usuarios);
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  },

  async delete(req, res) {
    try {
      let id = req.params.id;
      let usuarios = await Usuario.findByPk(id);
      if (usuarios) {
        await usuarios.destroy();
        res.status(200).json({ message: "Usuário deletado com sucesso" });
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  },
};
