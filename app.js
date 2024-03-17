const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const protocolo = process.env.PROTOCOL || "http";
const port = process.env.PORT || 9999;

app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", //aluno
  password: "1234", //ifpecjbg
  database: "aula4",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.log("Erro ao conectar com o MySQL", err.message);
  } else {
    console.log("Conectado ao MySQL");
  }
});

// crud de cliente
let operationsCliente = {
  create: function (nome, email, endereco, telefone) {
    return connection
      .promise()
      .query(
        "insert into clientes (nome, email, endereco, telefone) VALUES (?,?,?,?)",
        [nome, email, endereco, telefone]
      );
  },
  find: function () {
    return connection.promise().query("select * from clientes for update");
  },
  findById: function (id) {
    return connection
      .promise()
      .query("select * from clientes where id = ?", [id]);
  },
  update: function (id, nome, email, endereco, telefone) {
    return connection
      .promise()
      .execute(
        "update clientes set nome = ?, email = ?, endereco = ?, telefone = ? where id = ?",
        [id, nome, email, endereco, telefone]
      );
  },
  delete: function (id) {
    return connection
      .promise()
      .execute("delete from clientes where id = ?", [id]);
  },
};

app.get("/api/cliente/", async (req, res) => {
  operationsCliente
    .find()
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      console.log(err, "Erro coletando os clientes");
      res.status(500).json({ message: "Erro" });
    });
});

app.get("/api/cliente/:id", async (req, res) => {
  const clienteId = req.params.id;
  operationsCliente
    .findById(clienteId)
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      console.log(err, "Cliente não encontrado");
      res.status(500).json({ message: "Erro" });
    });
});

app.post("/api/cliente", async (req, res) => {
  const { nome, email, endereco, telefone } = req.body;

  operationsCliente
    .create(nome, email, endereco, telefone)
    .then((result) => {
      console.log("Cliente inserido com sucesso");
      res.status(200).json({ message: "Sucesso" });
    })
    .catch((err) => {
      console.log(err, "Erro ao inserir cliente");
      res.status(500).json({ message: "Erro" });
    });
});

app.put("/api/cliente/:id", async (req, res) => {
  const clienteId = req.params.id;
  const { nome, email, endereco, telefone } = req.body;

  operationsCliente
    .update(nome, email, endereco, telefone, clienteId)
    .then((result) => {
      console.log("Cliente atualizado com sucesso");
      res.status(200).json({ message: "Sucesso" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Erro" });
    });
});

app.delete("/api/cliente/:id", async (req, res) => {
  const clienteId = req.params.id;

  operationsCliente.delete(clienteId).then((result) => {
    console.log(result);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Sucesso" });
      console.log("Cliente deleteado");
    } else {
      res.status(404).json({ message: "Erro" });
      console.log("Registro não encontrado");
    }
  });
});

// fim crud de cliente

// crud de categoria
let operationsCategoria = {
  create: function (nome, descricao) {
    return connection
      .promise()
      .query("insert into categorias (nome, descricao) VALUES (?,?)", [
        nome,
        descricao,
      ]);
  },
  find: function () {
    return connection.promise().query("select * from categorias for update");
  },
  findById: function (id) {
    return connection
      .promise()
      .query("select * from categorias where id = ? limit 1", [id]);
  },
  findByName: function (name) {
    return connection
      .promise()
      .query("select * from categorias where nome = ?", [name]);
  },
  update: function (id, nome, descricao) {
    return connection
      .promise()
      .execute("update categorias set nome = ?, descricao = ? where id = ?", [
        id,
        nome,
        descricao,
      ]);
  },
  delete: function (id) {
    return connection
      .promise()
      .execute("delete from categorias where id = ?", [id]);
  },
};


app.get("/api/categoria/byname/", async (req, res) => {
  const categoriaName = req.body.nome;
  operationsCategoria
    .findByName(categoriaName)
    .then((result) => {
      let categoria = JSON.stringify(result[0]);
      categoria = categoria.replace("[", "");
      categoria = categoria.replace("]", "");

      res.status(200).json(JSON.parse(categoria));
    })
    .catch((err) => {
      console.log(err, "Categoria não encontrada");
      res.status(500).json({ message: "Erro" });
    });
});

app.get("/api/categoria/", async (req, res) => {
  operationsCategoria
    .find()
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      console.log(err, "Erro coletando os clientes");
      res.status(500).json({ message: "Erro" });
    });
});

app.get("/api/categoria/:id", async (req, res) => {
  const categoriaId = req.params.id;
  operationsCategoria
    .findById(categoriaId)
    .then((result) => {
      let categoria = JSON.stringify(result[0]);
      categoria = categoria.replace("[", "");
      categoria = categoria.replace("]", "");

      res.status(200).json(JSON.parse(categoria));
    })
    .catch((err) => {
      console.log(err, "Categoria não encontrada");
      res.status(500).json({ message: "Erro" });
    });
});


app.post("/api/categoria", async (req, res) => {
  const { nome, descricao } = req.body;

  operationsCategoria
    .create(nome, descricao)
    .then((result) => {
      console.log("Categoria inserido com sucesso");
      res.status(200).json({ message: "Sucesso" });
    })
    .catch((err) => {
      console.log(err, "Erro ao inserir categora");
      res.status(500).json({ message: "Erro" });
    });
});

app.put("/api/categoria/:id", async (req, res) => {
  const categoriaId = req.params.id;
  const { nome, descricao } = req.body;

  operationsCategoria
    .update(nome, descricao, categoriaId)
    .then((result) => {
      console.log("Cliente atualizado com sucesso");
      res.status(200).json({ message: "Sucesso" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Erro" });
    });
});

app.delete("/api/categoria/:id", async (req, res) => {
  const categoriaId = req.params.id;

  operationsCategoria.delete(categoriaId).then((result) => {
    console.log(result);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Sucesso" });
      console.log("Cliente deleteado");
    } else {
      res.status(404).json({ message: "Erro" });
      console.log("Registro não encontrado");
    }
  });
});
// fim crud de categoria

// crud de produto
let operationsProduto = {
    create: function (nome, descricao, preco, idCategoria, disponivel) {
      return connection
        .promise()
        .query("insert into produtos (nome, descricao, preco, id_categoria, disponivel) VALUES (?,?,?,?,?)", [
          nome,
          descricao,
          preco,
          idCategoria,
          disponivel
        ]);
    },
    find: function () {
      return connection.promise().query("select * from produtos for update");
    },
    findById: function (id) {
      return connection
        .promise()
        .query("select * from produtos where id = ? limit 1", [id]);
    },
    findByName: function (name) {
      return connection
        .promise()
        .query("select * from produtos where nome = ?", [name]);
    },
    update: function (id, nome, descricao, preco, idCategoria, disponivel) {
      return connection
        .promise()
        .execute("update produtos set nome = ?, descricao = ?, preco = ?, id_categoria = ?, disponivel = ? where id = ?", [
          id,
          nome,
          descricao,
          preco,
          idCategoria,
          disponivel
        ]);
    },
    delete: function (id) {
      return connection
        .promise()
        .execute("delete from produtos where id = ?", [id]);
    },
    
  };
  
app.post("/api/produto", async (req, res) => {
  const { nome, descricao, preco, idCategoria, disponivel } = req.body;

  operationsCategoria
    .findById(idCategoria)
    .then(() => {
      operationsProduto
        .create(nome, descricao, preco, idCategoria, disponivel)
        .then(() => {
          console.log("Produto inserido com sucesso");
          res.status(200).json({ message: "Sucesso" });
        })
        .catch((err) => {
          console.log(err, "Erro ao inserir produto, verifique a categoria");
          res.status(500).json({ message: "Erro ao inserir produto, verifique a categoria" });
        });
    })
    .catch((err) => {
      console.log(err, "Erro ao verificar categoria");
      res.status(500).json({ message: "Erro ao verificar categoria" });
    });
});
  
app.get("/api/produto/byname/", async (req, res) => {
  const produtoNome = req.body.nome;
  operationsProduto
    .findByName(produtoNome)
    .then((result) => {
      let produto = JSON.stringify(result[0]);
      produto = produto.replace("[", "");
      produto = produto.replace("]", "");

      res.status(200).json(JSON.parse(produto));
    })
    .catch((err) => {
      console.log(err, "Produto não encontrado");
      res.status(500).json({ message: "Erro" });
    });
});

app.get("/api/produto/", async (req, res) => {
  operationsProduto
  .find()
  .then((result) => {
    res.status(200).json(result[0]);
  })
  .catch((err) => {
    console.log(err, "Erro coletando os produtos");
    res.status(500).json({ message: "Erro" });
  });
});

app.get("/api/produto/:id", async (req, res) => {
const produtoId = req.params.id;
operationsProduto
  .findById(produtoId)
  .then((result) => {
    let produto = JSON.stringify(result[0]);
    produto = produto.replace("[", "");
    produto = produto.replace("]", "");

    res.status(200).json(JSON.parse(produto));
  })
  .catch((err) => {
    console.log(err, "Produto não encontrada");
    res.status(500).json({ message: "Erro" });
  });
});

app.put("/api/produto/:id", async (req, res) => {
  const produtoId = req.params.id;
  const { nome, descricao, preco, idCategoria, disponivel } = req.body;

  operationsProduto
    .update(nome, descricao, preco, idCategoria, disponivel, produtoId)
    .then((result) => {
      console.log("Produto atualizado com sucesso");
      res.status(200).json({ message: "Sucesso" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Erro" });
    });
});

app.delete("/api/produto/:id", async (req, res) => {
  const produtoId = req.params.id;

  operationsProduto
  .delete(produtoId)
  .then((result) => {
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Sucesso" });
      console.log("Produto deleteado");
    } else {
      res.status(404).json({ message: "Erro" });
      console.log("Registro não encontrado");
    }
  });
});

// fim crud de produto

app.listen(port, () => {
  console.log(`Server started in http://localhost:${port}`);
});
