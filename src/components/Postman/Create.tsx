import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faAdd, faArrowLeft, faArrowRight, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Box, Button, Container, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material'
import axios from 'axios'
import router, { Router } from 'next/router'
import React, { useState, useReducer, useEffect, useContext } from 'react'
import { ulid } from 'ulid'
import { postsImage } from '../../assets/images/posts'
import { PostsContext } from '../../context/PostsContext'
import { questionType } from '../../utils/types/question'

export default function Create ( { bool, id }: { bool?: boolean, id?: string } ) {

    const allPosts = useContext( PostsContext )

    const [ , forceUpdate ] = useReducer( x => x + 1, 0 )
    const [ questions, setQuestions ] = useState( [ "question #1" ] )
    const [ editQuestions, setEditQuestions ] = useState( [ "question #1" ] )
    const [ createModel, setCreateModel ] = useState( false )
    const [ next, setNext ] = useState( false )
    const [ posts, setPosts ] = useState<questionType>( { image: postsImage, questions: questions } )
    const [ editPosts, setEditPosts ] = useState<questionType>( { image: postsImage } )

    const addQuesion = ( i: number ) => {
        if ( id ) {
            setEditQuestions( ( prev ) => [ ...prev, `` ] )
        }
        setQuestions( ( prev ) => [ ...prev, `` ] )
    }

    const handleTyping = ( e: any ) => {
        let { name, value } = e.target
        if ( id ) {
            let obj = { ...editPosts, [ name ]: value }
            setEditPosts( obj )
        }
        if ( !id ) {
            let obj = { ...posts, [ name ]: value }
            setPosts( obj )
        }
    }

    const handleImage = ( e: any ) => {
        let file = e.target.files[ 0 ]
        const reader = new FileReader()
        reader.onload = ( e ) => {
            setEditPosts( ( prev ) => ( { ...prev, image: e.target!.result } ) )
            setPosts( ( prev ) => ( { ...prev, image: e.target!.result } ) )
            // forceUpdate()
        }
        reader.readAsDataURL( file )
    }

    useEffect( () => {
        if ( !id ) return
        let arr = allPosts.find( ar => ar._id === id )
        setEditQuestions( arr!.questions as string[] )
        setEditPosts( arr as questionType )
        console.log( posts )
    }, [] )

    const removeQuestion = ( i: number ) => {
        if ( id ) {
            if ( editQuestions.length === 1 ) return
            let array = editQuestions
            array.pop()
            setEditQuestions( array )
        }
        else {
            if ( questions.length === 1 ) return
            let array = questions
            array.pop()
            setQuestions( array )
        }
        forceUpdate()
    }

    const handleChange = ( e: any, i: number ) => {
        if ( id ) {
            let value = e.target.value
            let array = editQuestions
            array[ i ] = value
            setEditQuestions( array )
            setEditPosts( ( prev ) => ( { ...prev, questions: editQuestions } ) )
        }
        else {
            let value = e.target.value
            let array = questions
            array[ i ] = value
            setQuestions( array )
            setPosts( ( prev ) => ( { ...prev, questions: questions } ) )
        }
        // forceUpdate()
        console.log( posts )
    }

    const submit = () => {
        if ( id ) {
            console.log( editPosts )
            console.log( editQuestions )
            axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }/posts/update/${ id }`, editPosts ).then( ( res ) => {
                console.log( res )
                router.reload()
            } )
            return
        }
        axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }/posts/create`, posts ).then( ( res ) => {
            console.log( res )
            setCreateModel( true )
            router.reload()
        } )
    }

    const fate = () => {
        return id ? editQuestions : questions
    }

    return (
        <>
            { ( ( id && ( typeof editPosts.name === 'string' ) ) || ( !id ) ) && ( <>
                <Container className="my-4">
                    { <h3 className="my-4"> { id ? `Edit ${ editPosts.name }` : `Create ${ posts.name }` } </h3> }
                    { next ? ( <>
                        { ( id ? editQuestions : questions ).map( ( question: any, i: number ) => (
                            <TextField autoFocus={ true } key={ i } onChange={ ( e ) => { handleChange( e, i ) } } className="my-2" value={ question } label={ `Question #${ i + 1 }` } multiline fullWidth InputProps={ {
                                endAdornment: (
                                    <>
                                        <InputAdornment position="end">
                                            { i === fate().length - 1 && <FontAwesomeIcon onClick={ () => { addQuesion( i ) } } className="text-blue-600 cursor-pointer" icon={ faAdd as IconProp } /> }
                                        </InputAdornment>
                                        <InputAdornment position="end">
                                            { i === fate().length - 1 &&
                                                <FontAwesomeIcon className="text-red-600 cursor-pointer" icon={ faClose as IconProp } onClick={ () => { removeQuestion( i ) } } /> }
                                        </InputAdornment>
                                    </>
                                ),
                            } } />
                        ) ) }
                        { id ? ( <Button className="float-left" onClick={ () => { submit() } }>
                            Confirm Changes
                        </Button> ) : ( <Button className="float-left" onClick={ () => { submit() } }>
                            Post Quiz
                        </Button> ) }
                    </> ) : ( <Box sx={ {
                        '& .MuiTextField-root': { m: 1 },
                    } }>
                        <TextField value={ editPosts.name } onChange={ handleTyping } name="name" className="my-4" fullWidth label="name" />
                        <TextField value={ editPosts.description } onChange={ handleTyping } name="description" className="my-4" multiline fullWidth label="description" />
                        <img className="w-full object-contain" src={ id ? editPosts.image as string : posts.image as string } alt="" />
                        <Button className="block relative my-4"> <input type="file" className="absolute w-full h-full opacity-0 " onChange={ handleImage } /> { id ? "Update Photo" : "Upload Photo" } </Button>
                    </Box> ) }
                    <div className="flex justify-end w-full items-center">
                        <IconButton className="" onClick={ () => setNext( false ) }>
                            <FontAwesomeIcon className="text-blue-500 text-lg" icon={ faArrowLeft as IconProp }></FontAwesomeIcon>
                        </IconButton>
                        <IconButton className="" onClick={ () => setNext( true ) }>
                            <FontAwesomeIcon className="text-blue-500 text-lg" icon={ faArrowRight as IconProp }></FontAwesomeIcon>
                        </IconButton>
                    </div>
                </Container>
                <Snackbar open={ createModel } autoHideDuration={ 6000 } onClose={ () => { setCreateModel( false ) } }>
                    <Alert onClose={ () => { setCreateModel( false ) } } severity="success" sx={ { width: '100%' } }>
                        Post Created Succesfully 😍
                    </Alert>
                </Snackbar>
            </> ) }
        </>
    )
}
