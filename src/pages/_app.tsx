import { createTheme, ThemeProvider } from "@mui/material"
import type { AppProps } from "next/app"
import { UserProvider } from "../context/UserContext"
import "../assets/styles/tailwind.css"
import { PostsContext, PostsProvider } from "../context/PostsContext"
import { AnswersProvider } from "../context/AnswersContext"
const theme = createTheme( {
  palette: {
    primary: {
      main: '#651cb1',
    },
    secondary: {
      main: '#c725c7',
    }
  },
  typography: {
    "fontFamily": "Poppins, Roboto, sans-serif"
  }
} )
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import { useContext, useEffect } from "react"


config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
function MyApp ( { Component, pageProps }: AppProps ) {
  const { allPosts, setAllPosts } = useContext( PostsContext )
  useEffect(() => {
    console.log(allPosts)
  }, [allPosts])
  return (
    <>
      { 1 && <UserProvider>
        <PostsProvider>
          <AnswersProvider>
            <ThemeProvider theme={ theme }>
              <Component { ...pageProps } />
            </ThemeProvider>
          </AnswersProvider>
        </PostsProvider>
      </UserProvider> }
    </>
  )
}

export default MyApp

//dist
