import React, {useState, useEffect} from 'react';
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [lembretes, setLembretes] = useState({});
    const buscarLembretes = async() => {
        const res = await axios.get('http://localhost:4000/lembretes');

        setLembretes(res.dados);
    };

    useEffect(() => {
        buscarLembretes();
    }, []);

    // console.log(lembretes);

    const lembretesOrganizados = Object.values(lembretes).map((lembrete) => {
        return (
            <div 
                className='card'
                style={{width:'30%', marginBottom: '20px'}}
                key={lembrete.contador}
            >
                <div className='card-content'>
                    <h3>{lembrete.texto}</h3>
                </div>
            </div>
        );
    });

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {lembretesOrganizados}
        </div>;
};