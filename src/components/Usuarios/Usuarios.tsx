import React, { useContext, useState } from "react"
import { Text, Box, Button, DataTable, Heading } from "grommet"
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
    <Box
      direction="column"
      pad={{ bottom: "large", top: "medium", horizontal: "medium" }}
    >
      <Text margin="small">Instrucciones</Text>
      <ul style={{ margin: "0" }}>
        <li>
          Para agregar usuarios, hacer click al botón de agregar usuarios.
        </li>
        <li>
          Para actualizar alguno, hacer click sobre un registro y llenar el
          formulario.
        </li>
        <li>
          ¡La actualización es en tiempo real! Al actualizar un registro el
          estado del componente se actualiza y re-renderiza los nuevos datos
        </li>
      </ul>
      <Heading size="small" margin={{ top: "medium", bottom: "none" }}>
        Registros 🔥
      </Heading>
      <DataTable
        margin={{ vertical: "medium" }}
        columns={columns}
        data={mapUsers(usuarios)}
        sortable
        background={{ header: "dark-2", body: ["white", "light-2"] }}
        resizeable
        onClickRow={({ datum }) => {
          setUserToUpdate(() => ({ ...datum } as User))
          setUpdate(() => true)
          open()
        }}
      />
      <Button
        style={{ width: "fit-content" }}
        color="accent-1"
        onClick={(e) => {
          e.persist()
          setUpdate(() => false)
          open()
        }}
        primary
        margin={{ top: "large" }}
        className="shadow"
        label="Agregar usuario"
      />
      <Modal>
        <Box
          background="light-1"
          height="inherit"
          width="500px"
          pad={{ vertical: "medium", horizontal: "large" }}
          style={{
            borderRadius: "5px",
          }}
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
