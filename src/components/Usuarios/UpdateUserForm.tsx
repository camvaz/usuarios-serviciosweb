import React, { useState } from "react"
import { Form, Formik } from "formik"
import { Text, Button, FormField, Heading, TextInput, Box } from "grommet"
import { useToasts } from "react-toast-notifications"

import { User } from "../../App"

const UpdateUserForm: React.FC<{
  userProp: User
  close: any
}> = ({ userProp, close }) => {
  const { addToast } = useToasts()
  const [choice, setChoice] = useState(0)

  return (
    <>
      <Heading size="small" textAlign="center" margin={{ top: "small" }}>
        Actualiza Información
      </Heading>
      {choice === 0 ? (
        <Box>
          <Text margin={{ bottom: "medium" }}>Elige una opcion:</Text>
          <Box direction="row" alignContent="center" justify="between">
            <Button
              primary
              color="neutral-3"
              label="Actualizar credenciales"
              onClick={() => setChoice(() => 1)}
            />
            <Button
              primary
              color="neutral-4"
              label="Actualizar información"
              onClick={() => setChoice(() => 2)}
            />
          </Box>
        </Box>
      ) : choice === 1 ? (
        <Formik
          initialValues={{
            ...userProp,
            user: "",
            pass: "",
          }}
          onSubmit={(
            { id, nombre, correo, rol, telefono, user, pass },
            { setSubmitting }
          ) => {
            setSubmitting(true)
            const datos = new FormData()
            datos.append("user", user)
            datos.append("pass", pass)
            datos.append("searchedUser", id as string)
            datos.append(
              "userInfo",
              JSON.stringify({ nombre, correo, rol, telefono })
            )

            fetch("http://localhost/updateUserInfo.php", {
              method: "POST",
              headers: {
                // "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
              // mode: "cors",
              body: datos,
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.setUserResult.code === "500") {
                  addToast(`Error. \nMensaje: ${JSON.stringify(data)}`, {
                    appearance: "error",
                  })
                  return
                }
                addToast(
                  `Operación exitosa. \nMensaje: ${JSON.stringify(data)}`,
                  {
                    appearance: "success",
                  }
                )
                close()
              })
              .catch((e) => {
                addToast(`Error. \nMensaje: ${e}`, { appearance: "error" })
                console.log(e)
              })
            setSubmitting(false)
          }}
        >
          {({ isSubmitting, setValues, values }) => {
            const onChangeValues = (e: any) => {
              e.persist()
              setValues((state) => ({
                ...state,
                [e.target.name]: e.target.value,
              }))
            }

            return (
              <Form className="form-usuarios">
                <FormField label="Nombre">
                  <TextInput
                    placeholder="Ingresa nombre"
                    name="nombre"
                    value={values.nombre}
                    onChange={onChangeValues}
                  ></TextInput>
                </FormField>
                <FormField label="Correo">
                  <TextInput
                    placeholder="Ingresa correo"
                    name="correo"
                    value={values.correo}
                    onChange={onChangeValues}
                  ></TextInput>
                </FormField>
                <FormField label="Rol">
                  <TextInput
                    placeholder="Ingresa rol"
                    name="rol"
                    value={values.rol}
                    onChange={onChangeValues}
                  ></TextInput>
                </FormField>
                <FormField label="Telefono">
                  <TextInput
                    placeholder="Ingresa Teléfono"
                    name="telefono"
                    value={values.telefono}
                    onChange={onChangeValues}
                  ></TextInput>
                </FormField>
                <Text weight="bold" margin={{ vertical: "small" }}>
                  Credenciales de acceso
                </Text>
                <FormField label="Usuario">
                  <TextInput
                    placeholder="Ingresa Usuario"
                    name="user"
                    value={values.user}
                    onChange={onChangeValues}
                  ></TextInput>
                </FormField>
                <FormField label="Contraseña">
                  <TextInput
                    placeholder="Ingresa Contraseña"
                    name="pass"
                    value={values.pass}
                    type="password"
                    onChange={onChangeValues}
                  ></TextInput>
                </FormField>
                <Button
                  margin={{ vertical: "medium" }}
                  type="submit"
                  disabled={isSubmitting}
                  primary
                  label="Enviar"
                />
              </Form>
            )
          }}
        </Formik>
      ) : choice === 2 ? (
        <Formik
          initialValues={{
            user: "",
            pass: "",
            newPass: "",
          }}
          onSubmit={({ user, pass, newPass }, { setSubmitting }) => {
            setSubmitting(true)
            const datos = new FormData()
            datos.append("user", user)
            datos.append("pass", pass)
            datos.append("newUser", userProp.id as string)
            datos.append("oldUser", userProp.id as string)
            datos.append("newPass", newPass)

            fetch("http://localhost/updateUser.php", {
              method: "POST",
              headers: {
                // "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
              // mode: "cors",
              body: datos,
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.setUserResult.code === "500") {
                  addToast(`Error. \nMensaje: ${JSON.stringify(data)}`, {
                    appearance: "error",
                  })
                  setSubmitting(false)
                  return
                }
                addToast(
                  `Operación exitosa. \nMensaje: ${JSON.stringify(data)}`,
                  {
                    appearance: "success",
                  }
                )
                setSubmitting(false)
                close()
              })
              .catch((e) => {
                addToast(`Error. \nMensaje: ${e}`, { appearance: "error" })
                setSubmitting(false)
                console.log(e)
              })
          }}
        >
          {({ isSubmitting, setValues, values }) => {
            const onChangeValues = (e: any) => {
              e.persist()
              setValues((state) => ({
                ...state,
                [e.target.name]: e.target.value,
              }))
            }

            return (
              <Form className="form-usuarios">
                <FormField label="Contraseña">
                  <TextInput
                    placeholder="Ingresa contraseña"
                    name="newPass"
                    type="password"
                    value={values.newPass}
                    onChange={onChangeValues}
                  ></TextInput>
                </FormField>
                <Text weight="bold" margin={{ vertical: "small" }}>
                  Credenciales de acceso
                </Text>
                <FormField label="Usuario">
                  <TextInput
                    placeholder="Ingresa Usuario"
                    name="user"
                    value={values.user}
                    onChange={onChangeValues}
                  ></TextInput>
                </FormField>
                <FormField label="Contraseña">
                  <TextInput
                    placeholder="Ingresa Contraseña"
                    name="pass"
                    type="password"
                    value={values.pass}
                    onChange={onChangeValues}
                  ></TextInput>
                </FormField>
                <Button
                  margin={{ vertical: "medium" }}
                  type="submit"
                  disabled={isSubmitting}
                  primary
                  label="Enviar"
                />
              </Form>
            )
          }}
        </Formik>
      ) : (
        ""
      )}
    </>
  )
}

export default UpdateUserForm
