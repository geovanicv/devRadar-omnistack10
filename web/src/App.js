import React, {useEffect, useState} from 'react';
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevForm from './components/DevForm'
import DevItem from './components/DevItem'

function App() {
  const [devs, setDevs] = useState([]);

  //useEffect:
  // disparar função toda vez que uma função açterar ou uma vez na montagem do component
  // 2 parametros
  // 1º a função que ele precisa executar
  // 2º quando a função precisa ser executada 
    // se o array estiver vazio: executa uma unica vez
    // se tiver alguma variavel, executa quando essa variável for modificada em algum momento

  useEffect(()=>{
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data])
  }

  return(
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App;
