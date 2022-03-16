import { createTheme, ThemeProvider } from "@mui/material"
import type { AppProps } from "next/app"
import { UserProvider } from "../context/UserContext"
import "../assets/styles/tailwind.css"
const theme = createTheme( {
  palette: {
    primary: {
      main: '#651cb1',
    },
    secondary: {
      main: '#c725c7',
    },
  },
} )

function MyApp ( { Component, pageProps }: AppProps ) {
  return (
    <UserProvider>
      <ThemeProvider theme={ theme }>
        <Component { ...pageProps } />
      </ThemeProvider>
    </UserProvider>
  )
}

export default MyApp
