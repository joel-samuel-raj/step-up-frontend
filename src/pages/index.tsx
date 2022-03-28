import { Button, Container, Box, Divider, Snackbar, Alert } from "@mui/material"
import type { NextPage } from "next"
import Navbar from "../components/Navbar"
import Mcq from "../components/Postman/mcq"
import { useEffect, useContext, useState, useReducer } from "react"
import axios from 'axios'
import { UserContext } from "../context/UserContext"
import { User } from "../utils/types/user"
import Editor from "rich-markdown-editor"
import { PostsContext } from "../context/PostsContext"
import { answerType } from "../utils/types/answer"
import { questionType } from "../utils/types/question"
import { AnswersContext } from "../context/AnswersContext"

const Home: NextPage = () => {

  const { allPosts } = useContext( PostsContext )
  const  answers  = useContext( AnswersContext )
  const user: User = useContext( UserContext )

  const [ , forceUpdate ] = useReducer( x => x + 1, 0 )

  const [ mcq, setMcq ] = useState<any>( [ {} ] )
  const [ data, setData ] = useState<[ questionType ]>( [ {} ] )
  const [ loginModel, setLoginModel ] = useState( false )
  const [ answer, setAnswer ] = useState<answerType>(  {answers : [{answer: ""}]} )
  const [ question, setQuestion ] = useState<questionType>({} )
  const [currentIndex, setCurrentIndex] = useState(0)

  const [existingAnswer, setExistingAnswer] = useState<any>({})

  useEffect( () => {
    console.log( process.env.NEXT_PUBLIC_BACKEND_URL )
    if ( allPosts.length > 0 ) {
      let arr: questionType[] = allPosts.filter( (post: any) => post.open === true )
      setData( arr as [ questionType ] )
      let array = answers.find(answer => answer.userId === user._id && answer.questionId === question._id)
      setExistingAnswer(array)
      console.log(existingAnswer)
      forceUpdate()
    }  
  }, [ allPosts, question, existingAnswer, answers ] )

  const handleChange = ( e: string, j: number ) => {
    let array = answer
    console.log(array!['answers']![j] = {
      answer : e as string
    })
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
        answers: answer.answers,
        userEmail: user.email,
        userPhone: user.phoneNumber,
        question: object
      }
      axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }/posts/answers/post`, obj ).then( () => setQuestion( {} ) )
      console.log(obj)
    }
  }
  const templateData = (j: number) => {
    if(question.questions![j].options!.length > 0) {
      let arr = question.questions![j].options!.map((opt, i) => {
        return {
          value : opt.value,
          answer : false
        }
      })
      // console.log(arr)
      return arr
    }
    forceUpdate()
  }

  const mcqData = ( data: any ) => {
    setMcq( data )
  }

  useEffect(() => {
    let array = answer
    array![ 'answers' ]![ currentIndex ] = {
      options : mcq
    }
    setAnswer(array)
    console.log(answer)
  }, [ currentIndex, mcq ])
        
  return (
    <>
      <Navbar />
      <Container className="my-4 mt-20">
        <h3 className="m-4"> Available Quiz 👇🏼 </h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          { data.map( ( dat: any, i: number ) => (
            <Box key={ i } onClick={ () => { setQuestion( data[ i ] ); console.log(data[i])  } } className="bg-gradient-to-tr cursor-pointer text-white from-purple-400 to-purple-900 rounded relative">
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
          { question.questions!.map( ( quest, j: number ) => ( <div onChange={() => {setCurrentIndex(j)}} key={ j } className="p-4">
            <p className="text-lg"> { quest.question } </p> 
            { quest!.options!.length > 0 ? <Mcq iconFlag={false} mcqData={mcqData} preData={ (existingAnswer === {} || typeof existingAnswer === 'undefined') ? templateData(j) : existingAnswer.options[j]}/> : <div className="my-4">
              <Editor value={(existingAnswer === {} || typeof existingAnswer === 'undefined') ? "" : existingAnswer.answers[j].answer } onChange={ ( value ) => { handleChange( value(), j ); setCurrentIndex(j) } } placeholder="Start Writing Here..."
              />
            </div> }
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
