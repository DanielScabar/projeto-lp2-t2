const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const app = express();
const observacoesPorLembreteId = {};

app.use(bodyParser.json());

app.get("/lembretes/:id/observacoes", (req, res) => {
  res.send(observacoesPorLembreteId[req.params.id] || []); //Retorna lista de observações associadas ao lembrete na URL
});

app.put("/lembretes/:id/observacoes", async (req, res) => {
  const idObs = uuidv4(); //Gera ID para a observação
  const { texto } = req.body; //Extrai conteúdo do cabeçalho da requisição
  const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || []; //Verifica se já existe lista de observações em um lembrete e salva.
  observacoesDoLembrete.push({ id: idObs, texto, status: "aguardando" }); //Adiciona observação na lista
  observacoesPorLembreteId[req.params.id] = observacoesDoLembrete; //Salva lista de observações do lembrete
  await axios.post("http://localhost:10000/eventos", {
    tipo: "ObservacaoCriada",
    dados: {
      id: idObs,
      texto,
      lembreteId: req.params.id,
      status: "aguardando",
    },
  }); //Emite evento quando observaçao for criada

  res.status(201).send(observacoesDoLembrete); //Devolve lista de observações
});

app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
}); //Endpoint para recebimento de eventos

app.listen(5000, () => {
  console.log("Observacoes. Porta 5000");
});
