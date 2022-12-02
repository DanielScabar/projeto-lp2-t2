const express = require("express");
const bodyParser = require("body-parser");

const axios = require("axios"); //Para enviar eventos para os demais microsserviços

const app = express();
const eventos = [];

app.use(bodyParser.json());

app.post("/eventos", (req, res) => {
  const evento = req.body;
  eventos.push(evento);
  //envia o evento para o microsserviço de lembretes
  axios.post("http://192.168.15.160:4000/eventos", evento);
  //envia o evento para o microsserviço de observações
  axios.post("http://192.168.15.160:5000/eventos", evento);
  //envia o evento para o microsserviço de consulta
  axios.post("http://192.168.15.160:6000/eventos", evento);
  //envia o evento para o microsservico de classificacao
  axios.post("http://192.168.15.160:7000/eventos", evento);
  res.status(200).send({ msg: "ok" });
});

app.get("/eventos", (req, res) => {
  res.send(eventos);
});

app.listen(10000, () => {
  console.log("Barramento de eventos. Porta 10000");
});
