const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 3000;
app.use(
  cors({
    origin: "*",
  })
);

app.get("/usuario", async (req, res) => {
  const required = ["cep", "renda", "num"];
  required.forEach((item) => {
    if (!req.query[item]) {
      res.status(400).send({ result: "request inválido" });
    }
  });

  const ende = await axios.get(
    `http://viacep.com.br/ws/${req.query.cep}/json/`

  );

  const renda = parseInt(req.query.renda);
  const nome = req.query.nome;
  const num = parseInt(req.query.num);
  const rpc = renda / (num + 1);

  const response = {
    rua: ende.data.logradouro,
    bairro: ende.data.bairro,
    cidade: ende.data.localidade,
    est: ende.data.uf,
    nome,
    rpc,
    renda,
    num,
  };
  if (ende.data.erro) {
    res.status(404).send({ result: "CEP não encontrado" });
  }

  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log("aaaaaaaaaa")
});
