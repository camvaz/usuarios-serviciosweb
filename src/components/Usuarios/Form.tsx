import React, { Dispatch } from "react"
import { Button, FormField, Text, Heading, TextInput } from "grommet"
import { Form, Formik } from "formik"
import { useToasts } from "react-toast-notifications"

const UserForm: React.FC<{
  setCreated: React.Dispatch<
    React.SetStateAction<{
      id: string
      confirmed: boolean
    }>
  >
}> = ({ setCreated }) => {
  const { addToast } = useToasts()
  return (
    <>
      <Heading size="small" textAlign="center" margin={{ top: "small" }}>
        Crea Usuario
      </Heading>
      <Formik
        initialValues={{
          user: "",
          pass: "",
          newUser: "",
          newPass: "",
        }}
        onSubmit={({ user, pass, newUser, newPass }, { setSubmitting }) => {
          setSubmitting(true)
          const datos = new FormData()
          datos.append("user", user)
          datos.append("pass", pass)
          datos.append("newUser", newUser)
          datos.append("newPass", newPass)

          fetch("http://localhost/insertNewUser.php", {
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
              setSubmitting(false)
              setCreated(() => ({ id: newUser, confirmed: true }))
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
              <FormField label="Nombre de usuario">
                <TextInput
                  placeholder="Ingresa nombre de usuario"
                  name="newUser"
                  value={values.newUser}
                  onChange={onChangeValues}
                ></TextInput>
              </FormField>
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

export default UserForm
