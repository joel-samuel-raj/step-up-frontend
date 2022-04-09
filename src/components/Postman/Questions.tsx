import { faChevronDown, faClose, faPencil } from '@fortawesome/free-solid-svg-icons'
import { CSVLink } from "react-csv"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion, AccordionSummary, Box, Button, Container, Modal, AccordionDetails, Divider, Switch, Alert, Snackbar } from '@mui/material'
import axios from 'axios'
import router from 'next/router'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import Create from './Create'
import Editor from "rich-markdown-editor"
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { PostsContext } from '../../context/PostsContext'
import { AnswersContext } from '../../context/AnswersContext'
import { answerType } from '../../utils/types/answer'
import Mcq from './mcq'

export default function Questions () {

  const [ , forceUpdate ] = useReducer( x => x + 1, 0 )

  const { allPosts, setAllPosts } = useContext( PostsContext )
  const { allAnswers } = useContext( AnswersContext )

  const [ model, setModel ] = useState( false )
  const [ name, setName ] = useState( "" )
  const [ questionsModal, setQuestionsModal ] = useState( false )
  const [ confirmModal, setConfirmModal ] = useState( false )
  const [ editModal, setEditModal ] = useState( false )
  const [ createModal, setCreateModal ] = useState( false )
  const [ id, setId ] = useState<string[]>( [] )
  const [ data, setData ] = useState<any>( [] )
  const [ mcq, setMcq ] = useState<any>( [ {} ] )
  const [ update, setUpdate ] = useState( "" )
  const [ answers, setAnswers ] = useState<answerType[]>( [] )
  const [ currentAnswers, setCurrentAnswers ] = useState<answerType[]>( [] )
  const [ open, setOpen ] = useState<boolean[]>( new Array( allPosts.length ).fill( true ) as boolean[] )
  const [ datas, setDatas ] = useState<any>( [] )
  const [noRes, setNoRes] = useState(false)

  useEffect( () => {
    if ( currentAnswers.length < 1 ) return
    console.log( currentAnswers )
    let header = currentAnswers![0].question!.questions!.map(({question}) => question)
    header.splice( 0, 0, "Student Name" )
    let excel = currentAnswers.map( curr => {
      let array = curr!.answers!.map( ( { options, answer }, i ) => {
        if ( answer ) {
          return answer
        }
        if ( options ) {
          if ( options.length > 1 ) {
            let optData = options.map( ( opt, j ) => {
              if ( opt.answer === true ) {
                return opt.value
              }
            } )
            return optData.filter( ( dat ) => dat != undefined )
          }
        }
      } )
      array.splice(0,0, curr.userName)
      return array
    } )
    excel.splice( 0, 0, header )
    console.log( excel )
    setDatas( excel )
  }, [ currentAnswers ] )


  const mcqData = ( data: any ) => {
    console.log( data )
  }

  useEffect( () => {
    setAnswers( allAnswers as answerType[] )
  }, [ allAnswers ] )

  useEffect( () => {
    setData( allPosts )
    console.log( data )
  }, [ allPosts ] )

  const handleClick = ( id: string ) => {
    let dat = answers.filter( answer => answer.questionId! === id && answer.progress === false )
    setCurrentAnswers( dat )
    dat.length ? setNoRes(false) : setNoRes(true)
    console.log( "currentAnswers", dat )
  }

  const handleDelete = () => {
    axios.get( `${ process.env.NEXT_PUBLIC_BACKEND_URL }
/posts/delete/${ id.pop() }` ).then( () => {
      router.reload()
    } )
    // setAllPosts((prev: any) => prev.map((post: any) => {
    //   if ( post._id != id ) {
    //     return post 
    //   }
    // }))
    // setConfirmModal( false )
  }

  const handleQuestion = ( id: any ) => {
    let arr = data.find( ( dat: any ) => dat._id === id )
    return arr
  }

  const handleValidate = ( j: number, key: string ) => {
    let array = currentAnswers
    if ( key === "star" ) {
      array[ j ].star = true
    }
    if ( key === "validate" ) {
      array[ j ].validate = true
    }

    setCurrentAnswers( array )
    console.log( currentAnswers )
    axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }
/posts/answers/validate/${ currentAnswers[ j ].ulid }`, currentAnswers[ j ] )
    forceUpdate()
  }

  const classChange = ( bool: boolean ) => {
    let classes = "cursor-pointer p-2 pr-14 rounded relative"
    return bool ? `${ classes } bg-gradient-to-tr from-green-400 to-green-500 text-white` : `${ classes } bg-gradient-to-tr from-red-400 to-red-500 text-white`
  }

  const handleSwitch = ( e: any, i: number ) => {
    e.stopPropagation()
    let arr = data
    arr[ i ].open = e.target.checked
    setData( arr )
    console.log( data )
    axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }
/posts/update/${ data[ i ]._id }`, data[ i ] )
  }

  return (
    <>
      <Container>
        <h3 className="m-4"> Admin Page 👑 </h3>
      </Container>
      <Container className="px-4 ">
        <div className="rounded shadow-lg bg-gray-200 p-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4">
            { data.map( ( dat: any, i: number ) => (
              <Box onClick={ () => { handleClick( dat._id ) } } key={ i } className={ classChange( dat.open ) }>
                <h4> { dat.name } </h4>
                <Switch color="success"
                  checked={ dat.open }
                  onChange={ ( e ) => handleSwitch( e, i ) }
                />
                <div className="p-2 w-6 flex justify-center items-center h-6 cursor-pointer bg-purple-800 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => {
                  setConfirmModal( true )
                  setId( ( arr ) => [ ...arr, dat._id ] )
                } }>
                  <FontAwesomeIcon className="text-white text-lg" icon={ faClose as IconProp }></FontAwesomeIcon>
                </div>
                <div className="flex justify-center items-center p-2 w-6 h-6 cursor-pointer bg-green-500 hover:bg-green-600 rounded absolute top-2 right-10" onClick={ () => {
                  setEditModal( true ); setUpdate( dat._id as string )
                } }>
                  <FontAwesomeIcon className="text-white text-lg" icon={ faPencil as IconProp }></FontAwesomeIcon>
                </div>
              </Box>
            ) ) }
          </div>
          <Button className="mt-4" onClick={ () => { setQuestionsModal( true ) } } variant="contained"> Create New Quiz </Button>
        </div>
      </Container>
      <Container className="mt-4">
        { currentAnswers.length > 0 && <Box>
          { currentAnswers.map( ( ans, j ) => ( <div key={ j } className="py-4"> <Accordion sx={ { backgorundColor: "gray" } } className="bg-purple_heart-50">
            <AccordionSummary color="primary" className="rounded text-black mb-0 text-lg" expandIcon={ <FontAwesomeIcon icon={ faChevronDown as IconProp }></FontAwesomeIcon> }> { ans.userName } </AccordionSummary>
            <AccordionDetails> <Box>
              { handleQuestion( ans.questionId ).questions.map( ( quest: any, k: number ) => ( <div key={ k }>
                <p className="roboto whitespace-pre-line"> { quest.question } </p>
                { quest.isMcq ? ( <Mcq mcqData={ mcqData } changer={ [ 1, 2 ] } iconFlag={ false } readFlag={ true } preData={ ans.answers![ k ].options } ansData={ quest } /> ) : ( <div className="p-2 px-4 mt-4 bg-white rounded">
                  <Editor readOnly={ true } value={ ans.answers![ k ].answer }> </Editor>
                </div> )} 
                <Divider className="my-4"></Divider>
              </div> ) ) }
            </Box>
              <div className="flex items-center justify-around">
                <Button className="mt-4 text-blue-500" onClick={ () => { handleValidate( j, "validate" ) } }> Declare as Winner 🏆 </Button>
                <Button className="mt-4 text-yellow-500" onClick={ () => { handleValidate( j, "star" ) } }> Add to Watchlist ⭐ </Button>
              </div>
            </AccordionDetails>
          </Accordion> </div> ) ) }
          <CSVLink filename={currentAnswers[0]!.question!.name! + Date.now() as string + ".csv"} data={ datas }>
            <Button variant="contained" className="mt-4 bg-green-500 text-white"> Export </Button>
          </CSVLink>
        </Box> }
      </Container>

      <Container className="my-4">
        { currentAnswers.length > 0 ? <Box>
          <Divider className="bg-purple_heart-500 rounded-full my-4"></Divider>
          <h3 className="my-4"> Potential Winners ⚡ </h3>
          { currentAnswers.map( ( ans, j ) => ( <div key={ j }>{
            ans.star && <Box className="bg-purple_heart-100 rounded p-2">
              <h4 className=""> { ans.userName } </h4>
              <p onClick={ () => window.location.href = `mailto:${ ans.userEmail }?body=You have potential to win !` } className="text-blue-500 cursor-pointer hover:underline"> { ans.userEmail } </p>
              <p onClick={ () => window.location.href = `tel:${ ans.userPhone }` } className="text-blue-500 cursor-pointer hover:underline"> { ans.userPhone } </p>
            </Box> 
          }
          </div> ) )
          } </Box> :  noRes && <h3> No Responses yet 😔 </h3>}
      </Container>

      <Container className="my-4">
        { currentAnswers.length > 0 && <Box>
          <Divider className="bg-purple_heart-500 rounded-full my-4"></Divider>
          <h3 className="my-4">  Winners 🔥 </h3>
          { currentAnswers.map( ( ans, j ) => ( <div key={ j }>{
            ans.validate && <Box className="bg-purple_heart-100 rounded p-2">
              <h4 className=""> { ans.userName } </h4>
              <p onClick={ () => window.location.href = `mailto:${ ans.userEmail }?body=You have potential to win !` } className="text-blue-500 cursor-pointer hover:underline"> { ans.userEmail } </p>
              <p onClick={ () => window.location.href = `tel:${ ans.userPhone }` } className="text-blue-500 cursor-pointer hover:underline"> { ans.userPhone } </p>
            </Box>
          }
          </div> ) )
          } </Box> }
      </Container>

      <Modal
        className="flex justify-center items-center p-4"
        open={ questionsModal }
        onClose={ () => { setQuestionsModal( false ) } }
        style={ { overflow: 'auto' } }>
        <Modal open={ questionsModal }
          onClose={ () => { setQuestionsModal( false ) } }
          style={ { overflow: 'auto', padding: "1rem" } }>
          <Box className="bg-white my-4 px-4 md:px-16 m-4 md:m-auto md:w-4/5 lg:w-3/5 py-8 rounded relative flex justify-center items-center flex-col">
            <div className="flex justify-center items-center p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setQuestionsModal( false ) }>
              <FontAwesomeIcon className="text-white text-lg" icon={ faClose as IconProp }></FontAwesomeIcon>
            </div>
            <Create close={ ( bool: boolean ) => { setQuestionsModal( bool ); setCreateModal( !bool ) } } />
          </Box>
        </Modal>
      </Modal>

      <Modal style={ { overflow: 'auto' } } className="p-4 flex justify-center items-center"
        open={ editModal }
        onClose={ () => { setEditModal( false ) } }>
        <Modal open={ editModal }
          onClose={ () => { setEditModal( false ) } } style={ { overflow: 'auto', padding: "1rem" } }>
          <Box className="bg-white my-4 px-4 md:px-16 m-4 md:m-auto md:w-4/5 lg:w-3/5 py-8 rounded relative flex justify-center items-center flex-col">
            <div className="flex justify-center items-center p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setEditModal( false ) }>
              <FontAwesomeIcon className="text-white text-lg" icon={ faClose as IconProp }></FontAwesomeIcon>
            </div>
            <Create close={ ( bool: boolean ) => { setEditModal( bool ); setCreateModal( !bool ) } } id={ update } />
          </Box>
        </Modal>
      </Modal>
      <Modal
        className="flex justify-center items-center"
        open={ confirmModal }
        onClose={ () => { setConfirmModal( false ) } }>
        <Box className="bg-white px-16 py-8 rounded relative flex justify-center items-center flex-col">
          <div className="flex justify-center items-center p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2" onClick={ () => setConfirmModal( false ) }>
            <FontAwesomeIcon className="text-white text-lg" icon={ faClose as IconProp }></FontAwesomeIcon>
          </div>
          <h4> Are you sure to delele the quiz ? </h4>
          <div>
            <Button onClick={ () => { handleDelete() } } className="text-yellow-500" > Yes </Button>
            <Button onClick={ () => { setConfirmModal( false ) } } className="text-red-500" > No </Button>
          </div>
        </Box>
      </Modal>

      <Container>
      </Container>
      <Snackbar open={ createModal } autoHideDuration={ 6000 } onClose={ () => { setCreateModal( false ) } }>
        <Alert onClose={ () => { setCreateModal( false ) } } severity="success" sx={ { width: '100%' } }>
          Post Created Succesfully 😍
        </Alert>
      </Snackbar>
    </>
  )
}

//dist

