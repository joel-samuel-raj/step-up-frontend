import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faAdd, faArrowLeft, faArrowRight, faCheckSquare, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Box, Button, Container, InputAdornment, Snackbar, TextField } from '@mui/material'
import axios from 'axios'
import router, { Router } from 'next/router'
import React, { useState, useReducer, useEffect, useContext } from 'react'
import { ulid } from 'ulid'
import { postsImage } from '../../assets/images/posts'
import { PostsContext } from '../../context/PostsContext'
import { questionType } from '../../utils/types/question'
import Mcq from './mcq'

export default function Create ( { bool, id }: { bool?: boolean, id?: string } ) {

    const allPosts = useContext( PostsContext )

    const [ , forceUpdate ] = useReducer( x => x + 1, 0 )
    const [ questions, setQuestions ] = useState<questionType[ "questions" ]>( [ { question: "question #1" } ] )
    const [ isMcq, setIsMcq ] = useState( new Array( questions!.length + 1 ).fill( false ) )
    const [ mcq, setMcq ] = useState<any>( [ {} ] )
    const [ editQuestions, setEditQuestions ] = useState( [ "question #1" ] )
    const [ createModel, setCreateModel ] = useState( false )
    const [ next, setNext ] = useState( false )
    const [ posts, setPosts ] = useState<questionType>( { image: postsImage, questions: questions } )
    const [ editPosts, setEditPosts ] = useState<questionType>( { image: postsImage } )

    const addQuesion = ( i: number ) => {
        if ( id ) {
            setEditQuestions( ( prev ) => [ ...prev, `` ] )
        }
        setQuestions( ( prev ) => { return [ ...prev!, { question: `` } ] as unknown as [ { question: string } ] } )
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

    // useEffect( () => {
    //     if ( !id ) return
    //     let arr = allPosts.find( ar => ar._id === id )
    //     setEditQuestions( arr!.questions as string[] )
    //     setEditPosts( arr as questionType )
    //     console.log( posts )
    // }, [] )

    const removeQuestion = ( i: number ) => {
        if ( id ) {
            if ( editQuestions.length === 1 ) return
            let array = editQuestions
            array.pop()
            setEditQuestions( array )
        }
        else {
            if ( questions!.length === 1 ) return
            let array = questions
            array!.pop()
            setQuestions( array )
        }
        forceUpdate()
    }

    const questionType = ( i: number ) => {
        let bool = isMcq
        bool[ i ] = !bool[ i ]
        setIsMcq( bool )
        let arr = {
            question: questions![ i ].question,
            options: [ {
                value: "",
                answer: false
            } ] as [ {
                value: string,
                answer: boolean
            } ]
        }
        let array = questions
        array![ i ] = arr
        setQuestions( array )
        forceUpdate()
        // console.log( questions![ i ].options )
    }

    const handleChange = ( e: any, i: number ) => {
        if ( id ) {
            let value = e.target.value
            let array = editQuestions
            array[ i ] = value
            setEditQuestions( array )
            // setEditPosts( ( prev ) => ( { ...prev, questions: editQuestions } ) )
        }
        else {
            let value = e.target.value
            let array = questions
            array![ i ].question = value
            setQuestions( array )
            setPosts( ( prev ) => ( { ...prev, questions: questions } ) )
        }
        // forceUpdate()
        // console.log( posts )
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
        // axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }/posts/create`, posts ).then( ( res ) => {
        //     console.log( res )
        //     setCreateModel( true )
        //     router.reload()
        // } )
        console.log(posts)
    }

    const mcqData = ( data: any ) => {
        setMcq( data )
    }

    const handleMcqChange = ( i: number ) => {
        let object = {
            question: questions![ i ].question,
            options: mcq
        }
        let arr = posts
        arr.questions![i] = object
        setPosts(arr)
        // console.log(posts)
    }

    const fate = () => {
        return id ? editQuestions : questions
    }

    return (
        <>
            { ( ( id && ( typeof editPosts.name === 'string' ) ) || ( !id ) ) && ( <>
                <Container className="my-4">
                    { <h3 className="my-4"> { id ? `Edit ${ editPosts.name }` : `Create ${ posts.name }` } </h3> }
                    { next ? ( <Box sx={ {
                        '& .MuiTextField-root': { my: 1 }
                    } }>
                        { ( id ? editQuestions : questions )!.map( ( question: any, i: number ) => (
                            <div key={ i } className="textBox">
                                <TextField autoFocus={ true } onChange={ ( e ) => { handleChange( e, i ) } } className="my-2" value={ question.question } label={ `Question #${ i + 1 }` } multiline fullWidth InputProps={ {
                                    endAdornment: (
                                        <>
                                            <InputAdornment position="end">
                                                {
                                                    <FontAwesomeIcon className="text-green-500 cursor-pointer" icon={ faCheckSquare as IconProp } onClick={ () => { questionType( i ) } } /> }
                                            </InputAdornment>
                                            <InputAdornment position="end">
                                                { i === fate()!.length - 1 && <FontAwesomeIcon onClick={ () => { addQuesion( i ) } } className="text-blue-600 cursor-pointer" icon={ faAdd as IconProp } /> }
                                            </InputAdornment>
                                            <InputAdornment position="end">
                                                { i === fate()!.length - 1 &&
                                                    <FontAwesomeIcon className="text-red-600 cursor-pointer" icon={ faClose as IconProp } onClick={ () => { removeQuestion( i ) } } /> }
                                            </InputAdornment>
                                        </>
                                    ),
                                } } />
                                {isMcq[i] && (<div onChange = {() => handleMcqChange(i)} >
                                    <Mcq mcqData={ mcqData } />
                                </div>)}
                            </div>
                        ) ) }
                        { id ? ( <Button className="float-left" onClick={ () => { submit() } }>
                            Confirm Changes
                        </Button> ) : ( <Button className="float-left" onClick={ () => { submit() } }>
                            Post Quiz
                        </Button> ) }
                    </Box> ) : ( <Box sx={ {
                        '& .MuiTextField-root': { my: 1 },
                    } }>
                        <TextField value={ editPosts.name } onChange={ handleTyping } name="name" className="my-4" fullWidth label="name" />
                        <TextField value={ editPosts.description } onChange={ handleTyping } name="description" className="my-4" multiline fullWidth label="description" />
                        <img className="w-full object-contain" src={ id ? editPosts.image as string : posts.image as string } alt="" />
                        <Button className="block relative my-4"> <input type="file" className="absolute w-full h-full opacity-0 " onChange={ handleImage } /> { id ? "Update Photo" : "Upload Photo" } </Button>
                    </Box> ) }
                    <div className="flex justify-end w-full items-center">
                        <div className="mx-4" onClick={ () => setNext( false ) }>
                            <FontAwesomeIcon className="text-blue-500 text-lg" icon={ faArrowLeft as IconProp }></FontAwesomeIcon>
                        </div>
                        <div className="" onClick={ () => setNext( true ) }>
                            <FontAwesomeIcon className="text-blue-500 text-lg" icon={ faArrowRight as IconProp }></FontAwesomeIcon>
                        </div>
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
