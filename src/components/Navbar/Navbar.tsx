import React from "react"
import { Box, Header, Heading } from "grommet"
import { Anchor } from "react-feather"

function Navbar() {
  return (
    <Header background="brand">
      <Box direction="row" align="center" pad={{ horizontal: "large" }}>
        <Anchor size="32" />
        <Heading margin={{ vertical: "medium", left: "medium" }}>
          Practica 6.
        </Heading>
      </Box>
    </Header>
  )
}

export default Navbar
