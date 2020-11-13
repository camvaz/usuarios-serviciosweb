import React from "react"
import { Grommet } from "grommet"
import { ToastProvider } from "react-toast-notifications"

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
    <ToastProvider autoDismiss autoDismissTimeout={6000}>
      <UserState>
        <Grommet theme={theme}>
          <CondeRouter />
        </Grommet>
      </UserState>
    </ToastProvider>
  )
}

export default App
