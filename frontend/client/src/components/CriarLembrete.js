import React, { useState } from "react";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [topic, setTopic] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.put("http://localhost:4000/lembretes", { texto: topic });

        setTopic("");
    };

    return (
        <div>
            <form onSubmit={onSubmit} class="d-grid gap-2">
                <div className="form-group mt-3">
                    <label>Qual é o assunto desta tarefa?</label>
                    <input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="form-control mt-2"
                    />
                </div>
                <button className="btn btn-success mt-3" tyoe="button">Criar Tarefa</button>
            </form>
        </div>
    );
};
