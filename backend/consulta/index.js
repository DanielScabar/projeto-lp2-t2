const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const baseConsulta = {};

const funcoes = {
  LembreteCriado: (lembrete) => {
    baseConsulta[lembrete.contador] = lembrete;
  },
  ObservacaoCriada: (observacao) => {
    const observacoes =
      baseConsulta[observacao.lembreteId]["observacoes"] || [];
    observacoes.push(observacao);
    baseConsulta[observacao.lembreteId]["observacoes"] = observacoes;
  },
  ObservacaoAtualizada: (observacao) => {
    const observacoes = baseConsulta[observacao.lembreteId]["observacoes"];
    const indice = observacoes.findIndex((o) => o.id === observacao.id);
    observacoes[indice] = observacao;
  },
};

app.use(express.json());

app.get("/lembretes", (req, res) => {
  res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {
  try {
    funcoes[req.body.tipo](req.body.dados);
  } catch (err) {}

  res.status(200).send(baseConsulta);
});

app.listen(6000, async () => {
  console.log("Consultas. Porta 6000");
  const resp = await axios.get(
    "http://barramento-de-eventos-service:10000/eventos"
  );
  resp.data.forEach((valor, indice, colecao) => {
    try {
      funcoes[valor.tipo](valor.dados);
    } catch (err) {}
  });
});