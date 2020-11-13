import React from "react"
import { Box, Text, Header, Heading } from "grommet"
import { Cpu } from "react-feather"

function Navbar() {
  return (
    <Header
      background="accent-1"
      className="shadow"
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);" }}
    >
      <Box direction="row" align="center" pad={{ horizontal: "large" }}>
        <Cpu size="32" />
        <Heading margin={{ vertical: "medium", left: "medium" }}>
          Administración de usuarios
        </Heading>
        <Text margin="medium" alignSelf="end">
          Por Christian Hernandez
        </Text>
      </Box>
    </Header>
  )
}

export default Navbar
