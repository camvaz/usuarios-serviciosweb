import React, { useCallback, useContext, useEffect } from "react"
import firebase from "firebase/app"
import { Switch, BrowserRouter as Router } from "react-router-dom"
import { User } from "../App"
import { UserContext } from "../context/UserContext"
import Firebase from "../firebase/firebase"
import EnhancedRoute from "./EnhancedRoute"
import Usuarios from "./Usuarios/Usuarios"

const CondeRouter: React.FC = () => {
  const { setUsuarios } = useContext(UserContext)

  const fetchStuff = useCallback(() => {
    Firebase.database
      .ref(`usuarios_info`)
      .on("value", (snap: firebase.database.DataSnapshot) => {
        const users = snap.val()
        Object.keys(users).forEach((val) => {
          setUsuarios((state: Record<string, User>) => ({
            ...state,
            [val]: users[val],
          }))
        })
      })
  }, [setUsuarios])

  useEffect(() => {
    fetchStuff()
    return () => {}
  }, [fetchStuff])

  return (
    <Router>
      <Switch>
        <EnhancedRoute path="/" component={Usuarios} exact />
      </Switch>
    </Router>
  )
}

export default CondeRouter
