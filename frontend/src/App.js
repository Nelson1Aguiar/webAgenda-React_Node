import Usuario from './components/User/user.js';
import AgendaPacientes from './components/Agenda/Agenda.js';
import React, { useState } from 'react';

function App() {
  const [idLogado, setIdLogado] = useState(0);
  const [screen, setScreen] = useState('login');

  return (
    <div>
      {screen === "login" && (
        <Usuario setScreen={setScreen} setIdLogado={setIdLogado}/>
      )}
      {screen === 'homePage' && (
        <AgendaPacientes setScreen={setScreen} idLogado = {idLogado}/>
      )}
    </div>
  );
}
export default App;
