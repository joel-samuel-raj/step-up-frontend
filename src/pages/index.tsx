import { Button, Container, Box, Divider, Snackbar, Alert } from "@mui/material"
import type { NextPage } from "next"
import Navbar from "../components/Navbar"
import { useEffect, useContext, useState } from "react"
import axios from 'axios'
import { UserContext } from "../context/UserContext"
import { User } from "../utils/types/user"
import Editor from "rich-markdown-editor"
import { PostsContext } from "../context/PostsContext"
import { answerType } from "../utils/types/answer"
import { questionType } from "../utils/types/question"

const Home: NextPage = () => {

  const allPosts = useContext( PostsContext )
  const user: User = useContext( UserContext )

  const [ data, setData ] = useState<[ questionType ]>( [ {} ] )
  const [ loginModel, setLoginModel ] = useState( false )
  const [ answer, setAnswer ] = useState<string[]>( [] )
  const [ currentQuestion, setCurrentQuestion ] = useState( 0 )
  const [ question, setQuestion ] = useState<questionType>( {} )

  useEffect( () => {
    console.log( process.env.NEXT_PUBLIC_BACKEND_URL )
    if ( allPosts.length > 0 ) {
      let arr: questionType[] = allPosts.filter( post => post.open === true )
      setData( arr as [ questionType ] )
    }
  }, [ allPosts ] )

  const handleChange = ( e: string, j: number ) => {
    let array = answer
    array[ j ] = e
    setAnswer( array )
    console.log( answer )
  }

  const handleSubmit = ( j: any, object: questionType ) => {
    if ( !user.name ) {
      setLoginModel( true )
      console.log(loginModel)
      return
    }
    if ( user.name ) {
      let obj = {
        userName: user.name,
        userId: user._id,
        questionId: j,
        answers: answer,
        userEmail: user.email,
        userPhone: user.phoneNumber,
        question: object
      }
      axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }/posts/answers/post`, obj ).then( () => setQuestion( {} ) )
    }
  }

  return (
    <>
      <Navbar />
      <Container className="my-4 mt-20">
        <h3 className="m-4"> Available Quiz 👇🏼 </h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          { data.map( ( dat: any, i: number ) => (
            <Box key={ i } onClick={ () => { setQuestion( data[ i ] ) } } className="bg-gradient-to-tr cursor-pointer text-white from-purple-400 to-purple-900 rounded relative">
              <h3 className="m-4"> { dat.name } </h3>
              <img className="w-full object-contain rounded" src={ dat.image as string } alt="" />
              <Divider className="m-4 bg-purple-900"></Divider>
              <p className="m-4"> { dat.description } </p>
            </Box>
          ) ) }
        </div>
      </Container>
      { question._id && <Container className="mt-12 mb-4">
        <h3 className="my-4"> Take Quiz ✅ </h3>
        <div className="py-8 px-2 rounded shadow-lg border-2 border-purple-500">
          <h3 className="text-center"> { question.name } </h3>
          { question.questions!.map( ( quest, j: number ) => ( <div key={ j } className="p-4">
            <p className="text-lg"> { quest } </p>
            <div className="my-4">
              <Editor defaultValue="" onChange={ ( value ) => { handleChange( value(), j ) } } placeholder="Start Writing Here..."
              />
            </div>
          </div>
          ) ) }
          <Button onClick={ () => { handleSubmit( question._id, question ) } }> Submit </Button>
        </div>
      </Container> }
      <Snackbar anchorOrigin={{ vertical : 'top', horizontal: 'right' }} open={ loginModel } autoHideDuration={ 6000 } onClose={ () => setLoginModel( false ) }>
        <Alert onClose={ () => setLoginModel( false ) } severity="error" sx={ { width: '100%' } }>
          Please Login To Submit !
        </Alert>
      </Snackbar>
    </>
  )
}

export default Home
