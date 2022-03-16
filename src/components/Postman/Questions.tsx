import { faArrowRight, faChevronDown, faClose, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion, AccordionSummary, Box, Button, Container, IconButton, Modal, TextField, Typography, AccordionDetails, Divider } from '@mui/material'
import axios from 'axios'
import router from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import RichMarkdownEditor from 'rich-markdown-editor'
import Create from './Create'
import Update from './Update'
import Editor from "rich-markdown-editor"
import { UserContext } from '../../context/UserContext'
import { User } from '../../utils/types/user'

type answer = {
  _id: string,
  userName?: "",
  userId?: "",
  questionId?: "",
  answers?: string[],
  validate: boolean,
  userEmail: answer,
  userPhone: number
}

export default function Questions () {

  const user: User = useContext( UserContext )

  const [ model, setModel ] = useState( false )
  const [ name, setName ] = useState( "" )
  const [ questionsModal, setQuestionsModal ] = useState( false )
  const [ confirmModal, setConfirmModal ] = useState( false )
  const [ editModal, setEditModal ] = useState( false )
  const [ id, setId ] = useState<string[]>( [] )
  const [ data, setData ] = useState<any>( [ { name: "" } ] )
  const [ update, setUpdate ] = useState( "" )
  const [ answers, setAnswers ] = useState<answer[]>( [] )
  const [ currentAnswers, setCurrentAnswers ] = useState<answer[]>( [] )

  useEffect( () => {
    axios.get( "/server/posts/getPosts" ).then( ( response ) => {
      setData( response.data )
      // console.log( data )
    } )
    axios.get( "/server/posts/answers/get" ).then( res => setAnswers( res.data ) )
  }, [] )

  const handleClick = ( id: string ) => {
    let data: answer[] = answers.filter( answer => answer.questionId! === id )
    setCurrentAnswers( data )
    // console.log( currentAnswers )
  }

  const handleDelete = () => {
    axios.get( `/server/posts/delete/${ id.pop() }` ).then( () => {
      router.reload()
    } )
  }

  const handleQuestion = ( id: any ) => {
    let arr = data.find( ( dat: any ) => dat._id === id )
    // console.log( arr )
    return arr
  }

  const handleValidate = ( j: number ) => {
    let array = currentAnswers
    array[ j ].validate = true
    setCurrentAnswers( array )
    console.log( currentAnswers )
    axios.post( `/server/posts/answers/validate/${ currentAnswers[ j ]._id }`, currentAnswers[ j ] )
  }

  return (
    <>
      <Container className="py-4 rounded shadow-lg bg-purple_heart-200">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          { data.map( ( dat: any, i: number ) => (
            <Box onClick={ () => { handleClick( dat._id ) } } key={ i } className="bg-gradient-to-tr cursor-pointer text-white from-purple-400 to-purple-500 p-2 rounded relative">
              <h4> { dat.name } </h4>
              <IconButton className="p-2 w-6 h-6 cursor-pointer bg-purple-800 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => {
                setConfirmModal( true )
                setId( ( arr ) => [ ...arr, dat._id ] )
              } }>
                <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
              </IconButton>
              <IconButton className="p-2 w-6 h-6 cursor-pointer bg-green-500 hover:bg-green-600 rounded absolute top-2 right-10" onClick={ () => {
                setEditModal( true ); setUpdate( dat._id as string )
              } }>
                <FontAwesomeIcon className="text-white text-lg" icon={ faPencil }></FontAwesomeIcon>
              </IconButton>
            </Box>
          ) ) }
        </div>
        <Button className="mt-4" onClick={ () => { setModel( true ) } } variant="contained"> Create New Quiz </Button>
      </Container>
      <Container className="mt-4">
        { currentAnswers.length > 0 && <Box>
          { currentAnswers.map( ( ans, j ) => ( <div key={ j } className="py-4"> <Accordion className="bg-purple_heart-50">
            <AccordionSummary className="bg-purple_heart-300 rounded text-purple-900" expandIcon={ <FontAwesomeIcon icon={ faChevronDown }></FontAwesomeIcon> }> { ans.userName } </AccordionSummary>
            <AccordionDetails> <Box>
              { handleQuestion( ans.questionId ).questions.map( ( quest: any, k: number ) => ( <div key={ k }>
                <p className="font-bold mt-8"> { quest } </p>
                <div className="p-2 px-4 mt-4 bg-white rounded">
                  <Editor readOnly={ true } value={ ans.answers![ k ] }> </Editor>
                </div>
                <Divider></Divider>
              </div> ) ) }
            </Box> <Button className="mt-4" onClick={ () => { handleValidate( j ) } }> Validate </Button>  </AccordionDetails>
          </Accordion> </div> ) ) }
        </Box> }
      </Container>

      <Container>
        { currentAnswers.length > 0 && <Box>
          <Divider className="bg-purple_heart-500 rounded-full my-4"></Divider>
          <h3 className="my-4"> Potential Winners ⚡ </h3>
          { currentAnswers.map( ( ans, j ) => ( <div key={ j }>{
            ans.validate && <Box className="bg-purple_heart-100 rounded p-2">
              <h4 className=""> { ans.userName } </h4>
              <p onClick={() => window.location.href=`mailto:${ans.userEmail}?body=You have potential to win !`} className="text-blue-500 cursor-pointer hover:underline"> { ans.userEmail } </p>
              <p onClick={() => window.location.href=`tel:${ans.userPhone}`} className="text-blue-500 cursor-pointer hover:underline"> { ans.userPhone } </p>
            </Box>
          }
          </div> ) )
          } </Box> }
      </Container>

      <Modal
        className="flex justify-center items-center"
        open={ model }
        onClose={ () => { setModel( false ) } }>
        <Box className="bg-white px-16 py-8 rounded relative w-11/12">
          <IconButton className="p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setModel( false ) }>
            <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
          </IconButton>
          <h3 className="m-4 mt-0"> Create new Quiz </h3>
          <TextField fullWidth value={ name } onChange={ ( e ) => { setName( e.target.value ) } } label="Name of the new Quiz" placeholder="Type..." />
          <Button onClick={ () => { setModel( false ); setQuestionsModal( true ) } } className="float-right mt-4"> next <FontAwesomeIcon className="ml-2" icon={ faArrowRight }></FontAwesomeIcon>  </Button>
        </Box>
      </Modal>

      <Modal
        className="flex justify-center items-center"
        open={ questionsModal }
        onClose={ () => { setQuestionsModal( false ) } }>
        <Box className="bg-white sm:px-4 md:px-16 py-8 rounded relative w-11/12">
          <IconButton className="p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setQuestionsModal( false ) }>
            <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
          </IconButton>
          <Create name={ name } />
        </Box>
      </Modal>

      <Modal className="flex justify-center items-center"
        open={ editModal }
        onClose={ () => { setEditModal( false ) } }>
        <Box className="bg-white px-16 py-8 rounded relative flex justify-center items-center flex-col">
          <Create id={ update } />
        </Box>
      </Modal>

      <Modal
        className="flex justify-center items-center"
        open={ confirmModal }
        onClose={ () => { setConfirmModal( false ) } }>
        <Box className="bg-white px-16 py-8 rounded relative flex justify-center items-center flex-col">
          <IconButton className="p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setConfirmModal( false ) }>
            <FontAwesomeIcon className="text-white text-lg" icon={ faClose }></FontAwesomeIcon>
          </IconButton>
          <h4> Are you sure to delele the post ? </h4>
          <div>
            <Button onClick={ () => { handleDelete() } } className="text-yellow-500" > Yes </Button>
            <Button onClick={ () => { setConfirmModal( false ) } } className="text-red-500" > No </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}
