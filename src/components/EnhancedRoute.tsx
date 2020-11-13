import React from "react"
import { Route, RouteComponentProps } from "react-router-dom"
import { User } from "../App"
import Navbar from "./Navbar/Navbar"

interface ERProps {
  path: string
  exact?: boolean
  component: React.FunctionComponent<RouteComponentProps<any, any, unknown>>
}

const EnhancedRoute: React.FC<ERProps> = ({ path, exact, component }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <main className="conde-app">
          <Navbar />
          {React.createElement(component, props)}
        </main>
      )}
    />
  )
}

export default EnhancedRoute
