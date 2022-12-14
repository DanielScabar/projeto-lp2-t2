import React from "react";
import CriarLembrete from "./CriarLembrete";
import ListarLembrete from "./ListarLembrete";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <div className="container mt-3">
      <h1>Gerenciador de Tarefas</h1>
      <CriarLembrete />
      <hr />
      <h1>Tarefas:</h1>
      <ListarLembrete />
    </div>
  );
};