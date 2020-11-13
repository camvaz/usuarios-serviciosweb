import React from "react"
import { Form, Formik } from "formik"
import { Text, Button, FormField, Heading, TextInput } from "grommet"
import { useToasts } from "react-toast-notifications"

import { User } from "../../App"

const UpdateUserForm: React.FC<{
  userProp: User
  close: any
}> = ({ userProp, close }) => {
  const { addToast } = useToasts()
  return (
    <>
      <Heading size="small" textAlign="center" margin={{ top: "small" }}>
        Actualiza Información
      </Heading>
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
                color="accent-1"
                disabled={isSubmitting}
                primary
                label="Enviar"
              />
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default UpdateUserForm
