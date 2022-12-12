import React, {useState, useEffect} from 'react'
import axios from 'axios'
// import CriarObservacao from './CriarObservacao'
// import ListarObservacao from './ListarObservacao'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [lembretes, setLembretes] = useState({})
    const buscarLembretes = async() => {
        const res = await axios.get('http://localhost:6000/lembretes')
        console.log(res.dados)
        setLembretes(res.dados)
    }

    useEffect(() => {
        buscarLembretes()
    })

    console.log(lembretes)

    const lembretesOrganizados = Object.values(lembretes).map((lembrete) => {
        return (
          <div
            className="card"
            style={{ width: "30%", marginBottom: "30px" }}
            key={lembrete.contador}
            >
            <div className="card-body">
              <h3>{lembrete.texto}</h3>
              {/* <ListarObservacao lembreteId={lembrete.contador} /> */}
              {/* <CriarObservacao lembreteId={lembrete.contador} /> */}
            </div>
          </div>
        )
      })

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {lembretesOrganizados}
        </div>
}