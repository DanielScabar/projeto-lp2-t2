const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const observacoesPorLembreteId = {};

app.use(bodyParser.json());

app.get("/lembretes/:id/observacoes", (req, res) => {
  res.send(observacoesPorLembreteId[req.params.id] || []); //Retorna lista de observações associadas ao lembrete na URL
});

app.put("/lembretes/:id/observacoes", (req, res) => {
  const idObs = uuidv4(); //Gera ID para a observação
  const { texto } = req.body; //Extrai conteúdo do cabeçalho da requisição
  const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || []; //Verifica se já existe lista de observações em um lembrete e salva.
  observacoesDoLembrete.push({ id: idObs, texto }); //Adiciona observação na lista
  observacoesPorLembreteId[req.params.id] = observacoesDoLembrete; //Salva lista de observações do lembrete
  res.status(201).send(observacoesDoLembrete); //Devolve lista de observações
});

app.listen(5000, () => {
  console.log("Observacoes. Porta 5000");
});
