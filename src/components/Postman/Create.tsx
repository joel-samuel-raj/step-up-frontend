import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faAdd, faArrowLeft, faArrowRight, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Button, Container, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material'
import axios from 'axios'
import router, { Router } from 'next/router'
import React, { useState, useReducer, useEffect } from 'react'
import { ulid } from 'ulid'
import { postsImage } from '../../assets/images/posts'

type question = {
    name?: string
    description?: string
    image?: string | ArrayBuffer | null
    questions?: string[]
}

export default function Create ( { name, id }: { name?: string, id?: string } ) {
    const [ , forceUpdate ] = useReducer( x => x + 1, 0 )
    const [ questions, setQuestions ] = useState( [ "question #1" ] )
    const [ editQuestions, setEditQuestions ] = useState( [ "question #1" ] )
    const [ createModel, setCreateModel ] = useState( false )
    const [ next, setNext ] = useState( false )
    const [ posts, setPosts ] = useState<question>( { image: postsImage, questions: questions } )
    const [ editPosts, setEditPosts ] = useState<question>( { image: postsImage } )

    const addQuesion = ( i: number ) => {
        if ( id ) {
            setEditQuestions( ( prev ) => [ ...prev, `` ] )
        }
        setQuestions( ( prev ) => [ ...prev, `` ] )
    }

    const handleTyping = ( e: any ) => {
        let { name, value } = e.target
        let obj = { ...posts, [ name ]: value }
        setPosts( obj )
        console.log( posts )
    }

    const handleImage = ( e: any ) => {
        let file = e.target.files[ 0 ]
        const reader = new FileReader()
        reader.onload = ( e ) => {
            setEditPosts((prev) => ({...prev, image: e.target!.result}))
            forceUpdate()
        }
        reader.readAsDataURL( file )
    }

    useEffect( () => {
        if ( !id ) return
        axios.get( `/server/posts/${ id }` ).then( ( response ) => {
            let arr = response.data[ 0 ]
            setEditQuestions( arr.questions )
            console.log( editQuestions )
            console.log( arr )
            setEditPosts( arr )
            console.log( editPosts )
        } )
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
        }
        else {
            let value = e.target.value
            let array = questions
            array[ i ] = value
            setQuestions( array )
            posts.questions![ i ] = e.target.value
        }
        forceUpdate()
        console.log( posts )
    }

    const submit = () => {
        if ( id ) {
            console.log( editQuestions )
            axios.post( "server/posts/update", editPosts ).then( ( res ) => {
                console.log( res )
            } )
            return
        }
        axios.post( "server/posts/create", posts ).then( ( res ) => {
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
            { ( ( id && editPosts.name ) || ( !id ) ) && ( <>
                <Container className="my-4">
                    { <h3> { id ? "Create New Quiz" : `Edit quiz` } </h3> }
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
                        { id ? ( <Button className="float-right" onClick={ () => { submit() } }>
                            Confirm Changes
                        </Button> ) : ( <Button className="float-right" onClick={ () => { submit() } }>
                            Post Quiz
                        </Button> ) }
                    </> ) : ( <div>
                        <TextField value={ editPosts.name } onChange={ handleTyping } name="name" className="my-4" fullWidth label="name" />
                        <TextField value={ editPosts.description } onChange={ handleTyping } name="description" className="my-4" multiline fullWidth label="description" />
                        <img className="w-full object-contain" src={ posts.image as string } alt="" />
                        <Button className="block relative"> <input type="file" className="absolute w-full h-full opacity-0" onChange={ handleImage } /> Update Photo </Button>
                    </div> ) }
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
