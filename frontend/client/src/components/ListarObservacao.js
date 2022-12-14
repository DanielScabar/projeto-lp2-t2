import React, { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ lembreteId }) => {
    const [observations, setObservations] = useState([]);

    const buscarObservacoes = async () => {
        const res = await axios.get(
            `http://localhost:5000/lembretes/${lembreteId}/observacoes`
        );

        setObservations(res.data);
    };

    useEffect(() => {
        buscarObservacoes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const observacoesOrganizadas = observations.map((observacao) => {
        if ((observacao.status === "importante")) {
            return (
                <li key={observacao.id}>
                    <mark>{observacao.texto}</mark>
                </li>
            );
        }
        return <li key={observacao.id}>{observacao.texto}</li>;
    });

    return <ul>{observacoesOrganizadas}</ul>;
};