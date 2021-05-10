import React from 'react';
import { Formulario } from './componets/formulario';
import { useSelector } from "react-redux"
import { selectUser } from "./redux/userSlice"
import { Perfil } from './componets/perfil'

function App() {
  const user = useSelector(selectUser);
  return (
    <React.Fragment>
      { user ? <Perfil /> : <Formulario />}
    </React.Fragment>
  );
}

export default App;
