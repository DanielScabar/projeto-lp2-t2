import React, { useState, useEffect } from "react";
import axios from "axios";
import CriarObservacao from './CriarObservacao'
import ListarObservacao from './ListarObservacao'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [lembretes, setLembretes] = useState({});
  const buscarLembretes = async () => {
    const res = await axios.get("http://localhost:6000/lembretes");
    // console.log(res.data);

    setLembretes(res.data);
  };

  useEffect(() => {
    buscarLembretes();
  }, []);
  console.log("Lembretes:");
  console.log(lembretes);

  const lembretesOrganizados = Object.values(lembretes).map((lembrete) => {
    return (
      <div
        className="card mt-3 mb-3 shadow bg-body rounded"
        style={{ width: "30%" }}
        key={lembrete.contador}
      >
        <h3 class="card-header">{lembrete.texto}</h3>
        <div className="card-body">
          <ListarObservacao lembreteId={lembrete.contador} class="card-text" />
          <CriarObservacao lembreteId={lembrete.contador} class="card-text" />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {lembretesOrganizados}
    </div>
  );
};
