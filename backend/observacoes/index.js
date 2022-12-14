const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const observacoesPorLembreteId = {};

const funcoes = {
  ObservacaoClassificada: (observacao) => {
    const observacoes = observacoesPorLembreteId[observacao.lembreteId];
    const obsParaAtualizar = observacoes.find((o) => o.id === observacao.id);
    obsParaAtualizar.status = observacao.status;
    axios.post("http://barramento-de-eventos-service:10000/eventos", {
      tipo: "ObservacaoAtualizada",
      dados: {
        id: observacao.id,
        texto: observacao.texto,
        lembreteId: observacao.lembreteId,
        status: observacao.status,
      },
    });
  },
};

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
  await axios.post("http://barramento-de-eventos-service:10000/eventos", {
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
  try {
    funcoes[req.body.tipo](req.body.dados);
  } catch (err) {}

  res.status(200).send({ msg: "ok" });
}); //Endpoint para recebimento de eventos

app.listen(5000, () => {
  console.log("Observacoes. Porta 5000");
});