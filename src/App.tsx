import React from "react"
import { Grommet } from "grommet"

import UserState from "./context/state/UserState"
import CondeRouter from "./components/CondeRouter"

import "./App.scss"

export interface User {
  correo: string
  nombre: string
  rol: string
  telefono: string
  id?: string
}

const fetchUsers = () => {
  const headers = new Headers()
  headers.append("Content-Type", "text/xml")
  headers.append("SOAPAction", "basicInvoke")
  return fetch("http://localhost:58062/WSUsuarios.svc?wsdl", {
    headers,
    mode: "cors",
    method: "POST",
    // body:
  })
}
const theme = {
  global: {
    // colors: {
    //   brand: "#228BE6",
    // },
    font: {
      family: "'Poppins'",
      size: "18px",
      height: "20px",
    },
  },
}

function App() {
  return (
    <UserState>
      <Grommet theme={theme}>
        <CondeRouter />
      </Grommet>
    </UserState>
  )
}

export default App
