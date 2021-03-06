import { Button, Container, Box, Divider, Snackbar, Alert, Modal, TextField} from "@mui/material"
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
import { ulid } from "ulid"
import router from "next/router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClose } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from "@fortawesome/fontawesome-svg-core"

const Home: NextPage = () => {

  const { allPosts } = useContext( PostsContext )
  const { allAnswers, setAllAnswers } = useContext( AnswersContext )
  const user: User = useContext( UserContext )

  const [ , forceUpdate ] = useReducer( x => x + 1, 0 )

  const [ mcq, setMcq ] = useState<any>( [ {} ] )
  const [ data, setData ] = useState<[ questionType ]>( [ {} ] )
  const [ loginModel, setLoginModel ] = useState( false )
  const [ loginModel1, setLoginModel1 ] = useState( false )
  const [ responseModel, setResponseModel ] = useState( false )
  const [ answer, setAnswer ] = useState<answerType>( { answers: [ { answer: "" } ] } )
  const [ question, setQuestion ] = useState<questionType>( {} )
  const [ currentIndex, setCurrentIndex ] = useState( 0 )
  const [ currentQuestion, setCurrentQuestion ] = useState( -1 )
  const [ clicked, setClicked ] = useState( false )
  const [ answerModal, setAnswerModal ] = useState( new Array( 1000 ).fill( false ) )

  const [ existingAnswer, setExistingAnswer ] = useState<any>( {} )

  useEffect( () => {
    console.log( process.env.NEXT_PUBLIC_BACKEND_URL )
    if ( allPosts.length > 0 ) {
      let arr: questionType[] = allPosts.filter( ( post: any ) => post.open === true )
      // console.log(question)
      setData( arr as [ questionType ] )
      forceUpdate()
    }
  }, [ allPosts, question, allAnswers, answer ] )

  useEffect( () => {
    let array = allAnswers.find( answer => answer.userId === user._id && answer.questionId === question._id )
    setExistingAnswer( array )
    if ( array ) {
      if ( array._id ) {
        setAnswer( array as answerType )
      }
    }
    console.log( answer )
    // console.log( array )
    forceUpdate()
  }, [ question, existingAnswer, answer ] )

  const handleChange = ( e: string, j: number ) => {
    let array = answer
    array![ 'answers' ]![ j ] = {
      answer: e as string
    }
    setAnswer( array )
    console.log( answer )
  }

  const handleSubmit = ( j: any, object: questionType, flag?: boolean ) => {
    if ( !user.name ) {
      setLoginModel( true )
      console.log( loginModel )
      return
    }
    if ( !flag && !( question!.questions!.length === answer!.answers!.length ) ) {
      console.log( question!.questions!.length === answer!.answers!.length )
      alert( "Please fill answer all the questions to submit !" )
      return
    }
    if ( user.name ) {
      let obj: any = {
        ulid: ulid(),
        userName: user.name,
        userId: user._id,
        questionId: j,
        answers: answer.answers,
        userEmail: user.email,
        userPhone: user.phoneNumber,
        progress: flag,
        question: object
      }
      setResponseModel(true)
      if ( !( existingAnswer === {} || existingAnswer === undefined ) ) {
        axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }/posts/answers/update/${ existingAnswer.ulid }`, obj ).then( () => {
          // setQuestion( {} )
          setAllAnswers( ( prev: any ) => ( [ ...prev, obj ] ) )
          router.reload()
        } )
        return
      }
      axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }/posts/answers/post`, obj ).then( () => {
        // setQuestion( {} )
        setAllAnswers( ( prev: any ) => ( [ ...prev, obj ] ) )
        router.reload()
      } )
      console.log( "obj" )
    }
  }

  const editorValue = ( j: number ) => {
    if ( !( existingAnswer === {} || existingAnswer === undefined ) ) {
      if ( existingAnswer.answers ) {
        if ( existingAnswer.answers[ j ] ) {
          return existingAnswer.answers[ j ].answer
        }
        else {
          return 
        }
      }
    }
    else {
      console.log( existingAnswer )
      return 
    }
  }

  const templateData = ( j: number ) => {
    if ( question.questions![ j ].options!.length > 0 ) {
      if ( !( existingAnswer === {} || typeof existingAnswer === 'undefined' ) ) {
        if ( existingAnswer.answers ) {
          if ( existingAnswer.answers[ j ] ) {
            if ( existingAnswer.answers[ j ].options ) {
              if ( existingAnswer.answers[ j ].options.length > 1 ) {
                let arr = existingAnswer.answers![ j ].options
                console.log( arr )
                return arr
              }
            }
          }
        }
      }
      else {
        let arr = question.questions![ j ].options!.map( ( opt, i ) => {
          return {
            value: opt.value,
            answer: false
          }
        } )
        return arr
      }
    }
    // forceUpdate()
  }

  const handleModalClose = ( i: number ) => {
    setAnswerModal( ( prev ) => prev.map( ( pre, j ) => j === i ? false : pre ) )
    console.log( answerModal )
  }

  const mcqData = ( data: any ) => {
    setMcq( data )
  }

  useEffect( () => {
    if ( answer && clicked ) {
      let array = answer
      array![ 'answers' ]![ currentIndex ] = {
        options: mcq
      }
      setAnswer( array )
      console.log( answer )
    }
  }, [ currentIndex, mcq, question ] )

  return (
    <>
      <Navbar />
      <Container className="my-4 mt-20">
        <h3 className="m-4"> Available Quiz ???????? </h3>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          { data.map( ( dat: any, i: number ) => {
            console.log(dat); return (
              <Box key={ i } onClick={ !user.name ? () => {
                setLoginModel(true)
            } : () => {
              setQuestion( data[ i ] ); setAnswerModal( ( prev ) => prev.map( ( pre, l ) => {
                return l === i ? true : pre
              } ) ); setCurrentQuestion( i ); console.log( answerModal, currentQuestion )
            } } className="bg-gradient-to-tr cursor-pointer text-white from-purple-400 to-purple-900 rounded relative">
              <h3 className="m-4"> { dat.name } </h3>
              <img className="w-full object-contain rounded" src={ dat.image as string  } alt="" />
              <Divider className="m-4 bg-purple-900"></Divider>
              <p className="m-4"> { dat.description } </p>
            </Box>
          )} ) }
        </div>
      </Container>
      { currentQuestion >= 0 && <Modal style={{zIndex: 60}} className="flex justify-center z-10" open={ answerModal[ currentQuestion ] } onClose={ () => handleModalClose( currentQuestion ) }>
        <Modal style={{zIndex: 65}} className="flex pt-14 justify-center z-20  " open={ answerModal[ currentQuestion ] } onClose={ () => handleModalClose( currentQuestion ) }>
          <Box style={ { overflow: "auto", zIndex: 70 } } className="z-30 w-11/12 relative bg-white m-4 p-4 lg:px-12 h-11/12">
            <div className="p-2 flex justify-center items-center w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-4 right-2" onClick={ () => handleModalClose( currentQuestion ) }>
              <FontAwesomeIcon className="text-white text-lg" icon={ faClose as IconProp }></FontAwesomeIcon>
            </div>
            <h3 className="my-4"> Take Quiz ??? </h3>
            <div className="py-8 px-2 rounded shadow-lg w-full border-2 border-purple-500">
              <h3 className="text-center"> { question.name } </h3>
              { question && question.questions && question.questions!.map( ( quest, j: number ) => ( <div onChange={ () => { setCurrentIndex( j ); setClicked( true ) } } key={ j } className="p-4">
                <TextField variant="standard" label={`Question #${j + 1}`} className="whitespace-pre-line w-full" fullWidth multiline value={ quest.question } />
                { quest!.options!.length > 1 ? <Mcq iconFlag={ false } inputFlag={ true } mcqData={ mcqData } changer={ [ question._id, existingAnswer ] } preData={ templateData( j ) } /> : <div className="my-4">
                  <Editor value={ editorValue( j ) } onChange={ ( value ) => { handleChange( value(), j ); setCurrentIndex( j ) } } placeholder="Start Writing Here..."
                  />
                </div> }
              </div>
              ) ) }
              <div className="flex m-4">
                <div className="mr-4"> 
                  <Button variant="contained" className="bg-green-500" onClick={ () => { handleSubmit( question._id, question, false ) } }> Submit </Button>
                </div>
                <Button variant="outlined" onClick={ () => { handleSubmit( question._id, question, true ) } }> Save Progress </Button>
              </div>
            </div>
          </Box> 
        </Modal>
      </Modal> }
      <Snackbar anchorOrigin={ { vertical: 'top', horizontal: 'right' } } open={ responseModel } autoHideDuration={ 6000 } onClose={ () => setResponseModel( false ) }>
        <Alert onClose={ () => setLoginModel( false ) } severity="success" sx={ { width: '100%' } }>
          Response saved successfully !
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={ { vertical: 'top', horizontal: 'right' } } open={ loginModel } autoHideDuration={ 6000 } onClose={ () => setLoginModel( false ) }>
        <Alert onClose={ () => setLoginModel( false ) } severity="warning" sx={ { width: '100%' } }>
          Please login to continue !
        </Alert>
      </Snackbar>
    </>
  )
}

export default Home

//dist

