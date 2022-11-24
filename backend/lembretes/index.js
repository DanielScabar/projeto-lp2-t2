const express = require("express");
const app = express();

const lembretes = {};

app.get("/lembretes", (req, res) => {
  res.send(lembretes);
});

app.put("/lembretes", (req, res) => {});

app.listen(4000, () => {
  console.log("Lembretes. Porta 4000");
});
