import React from "react"
import { User } from "../App"

export const UserContext: React.Context<{
  usuarios: Record<string, User>
  setUsuarios: React.Dispatch<React.SetStateAction<Record<string, User>>> | any
}> = React.createContext({
  usuarios: {},
  setUsuarios: () => {},
})
