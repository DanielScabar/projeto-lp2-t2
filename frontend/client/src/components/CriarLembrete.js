import React, {useState} from "react";
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [topic, setTopic] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post('https://localhost:4000/lembretes', {
            topic,
        });

        setTopic('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-input-section">
                    <label>Assunto do lembrete</label>
                    <input 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="form-input-field"
                    />
                </div>
                <button className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
};