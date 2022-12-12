import React, {useState, useEffect} from "react"
import axios from "axios"

// eslint-disable-next-line import/no-anonymous-default-export
export default ({lembreteId}) => {
    const [observations, setObservations] = useState([])

    const buscarObservacoes = async () => {
        const res = await axios.get(`http://localhost:5000/lembretes/${lembreteId}/observacoes`)
    
        setObservations(res.dados)
    }

    useEffect(() => {
        buscarObservacoes()
    }, [])

    const observacoesOrganizadas = observations.map(observacao => {
        return <li key={observacao.id}>{observacao.texto}</li>
    })

    return (
        <ul>
            {observacoesOrganizadas}
        </ul>
    )
}