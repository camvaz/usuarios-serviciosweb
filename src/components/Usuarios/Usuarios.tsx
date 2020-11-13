import React, { useContext, useState } from "react"
import { Box, Button, DataTable, Heading } from "grommet"
import useModal from "react-hooks-use-modal"

import { User } from "../../App"
import { UserContext } from "../../context/UserContext"
import Form from "./Form"

import "./Usuarios.scss"
import UInfoForm from "./UInfoForm"
import UpdateUserForm from "./UpdateUserForm"

const mapUsers: (users: Record<string, User>) => User[] = (users) =>
  Object.keys(users).map((id) => ({ ...users[id], id }))

const columns = [
  {
    property: "correo",
    header: "Correo",
    primary: true,
  },
  {
    property: "nombre",
    header: "Nombre",
  },
  {
    property: "rol",
    header: "Rol",
  },
  {
    property: "telefono",
    header: "Telefono",
  },
]

const Usuarios: React.FC = () => {
  const { usuarios } = useContext(UserContext)
  const [Modal, open, close] = useModal("root", {
    preventScroll: false,
  })
  const [userToUpdate, setUserToUpdate] = useState<User>({} as User)
  const [update, setUpdate] = useState<boolean>(false)
  const [created, setCreated] = useState<{ id: string; confirmed: boolean }>({
    id: "",
    confirmed: false,
  })

  return (
    <Box direction="column" pad={{ vertical: "large", horizontal: "medium" }}>
      <Heading size="small" margin="none">
        Usuarios
      </Heading>
      <DataTable
        margin={{ vertical: "medium" }}
        columns={columns}
        data={mapUsers(usuarios)}
        sortable
        resizeable
        onClickRow={({ datum }) => {
          setUserToUpdate(() => ({ ...datum } as User))
          setUpdate(() => true)
          open()
        }}
      />
      <Button
        style={{ width: "fit-content" }}
        color="brand"
        onClick={(e) => {
          e.persist()
          setUpdate(() => false)
          open()
        }}
        primary
        label="Agregar usuario"
      />
      <Modal>
        <Box
          background="light-1"
          height="inherit"
          width="500px"
          pad={{ vertical: "medium", horizontal: "large" }}
          style={{ borderRadius: "5px" }}
        >
          {update ? (
            <UpdateUserForm close={close} userProp={userToUpdate} />
          ) : !created.confirmed ? (
            <Form setCreated={setCreated} />
          ) : (
            <UInfoForm close={close} data={created} setCreated={setCreated} />
          )}
        </Box>
      </Modal>
    </Box>
  )
}

export default Usuarios
