import React, { useState } from "react";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ lembreteId }) => {
    const [observationText, setObservationText] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.put(
            `http://localhost:5000/lembretes/${lembreteId}/observacoes`,
            { texto: observationText }
        );

        setObservationText("");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Digite os detalhes:</label>
                    <input
                        value={observationText}
                        onChange={(e) => setObservationText(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-outline-primary mt-2">Adicionar</button>
            </form>
        </div>
    );
};
