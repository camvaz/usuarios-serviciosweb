import React, { useState } from "react"
import { User } from "../../App"
import { UserContext } from "../UserContext"

const UserState: React.FC = ({ children }) => {
  const [usuarios, setUsuarios] = useState<Record<string, User>>({})
  return (
    <UserContext.Provider value={{ usuarios, setUsuarios }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserState
