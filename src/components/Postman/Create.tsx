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
import storage from '../../utils/Functions/firebase'
import { questionType } from '../../utils/types/question'
import Mcq from './mcq'

export default function Create ( { close, id }: { close?: any, id?: string } ) {

    const { allPosts, setAllPosts } = useContext( PostsContext )

    const [ , forceUpdate ] = useReducer( x => x + 1, 0 )
    const [ questions, setQuestions ] = useState<questionType[ "questions" ]>( [ { question: "question #1" } ] )
    const [ isMcq, setIsMcq ] = useState( new Array( questions!.length + 1 ).fill( false ) )
    const [ mcq, setMcq ] = useState<any>( [ {} ] )
    const [ editQuestions, setEditQuestions ] = useState<any>( [ "question #1" ] )
    const [ createModel, setCreateModel ] = useState( false )
    const [ next, setNext ] = useState( false )
    const [ posts, setPosts ] = useState<questionType>( { image: postsImage, questions: questions } )
    const [ editPosts, setEditPosts ] = useState<questionType>( {} )
    const [ settingDone, setSettingDone ] = useState( false )
    const [ changeDone, setChangeDone ] = useState( false )
    const [ currentIndex, setCurrentIndex ] = useState( 0 )
    const [ image, setImage ] = useState<File>()

    const addQuestion = ( i: number ) => {
        if ( id ) {
            setEditQuestions( ( prev: any ) => { return [ ...prev!, { question: `` } ] as unknown as [ { question: string } ] } )
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
        setImage( file )
        const reader = new FileReader()
        reader.onload = ( e ) => {
            setEditPosts( ( prev ) => ( { ...prev, image: e.target!.result } ) )
            setPosts( ( prev ) => ( { ...prev, image: e.target!.result } ) )
            // forceUpdate()
        }
        setPosts( ( prev ) => ( { ...prev, ulid: ulid() as string } ) )
        console.log( posts )
        reader.readAsDataURL( file )

    }

    useEffect( () => {
        if ( !id ) return
        let arr = allPosts.find( ar => ar._id === id )
        setEditQuestions( arr!.questions )
        setEditPosts( arr as questionType )
        console.log( "editPosts", editPosts )
        setSettingDone( true )
    }, [ currentIndex ] )

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
        console.log( isMcq[ i ] )
        if ( id ) {
            let arr = {
                question: editQuestions![ i ].question,
                options: [ {
                    value: "",
                    answer: false
                } ] as [ {
                    value: string,
                    answer: boolean
                } ]
            }
            let array = editQuestions
            array![ i ] = arr
            setEditQuestions( array )
            console.log( editQuestions )
            forceUpdate()
            return
        }
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
        console.log( questions )
        forceUpdate()
        console.log( questions![ i ].options )
    }

    const handleChange = ( e: any, i: number ) => {
        if ( id ) {
            let value = e.target.value
            let array = editQuestions
            array[ i ].question = value
            setEditQuestions( array )
            setEditPosts( ( prev ) => ( { ...prev, questions: editQuestions } ) )
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
        if ( id && image ) {
            storage.ref( `/images/${ editPosts.ulid }` ).put( image as File ).on( "state_changed", ( snapshot ) => console.log( snapshot ), alert, () => {
                storage.ref( "images" ).child( editPosts.ulid as string ).getDownloadURL().then( url => editPosts.image = url as string ).then( () => {
                    axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }/posts/update/${id}`, editPosts ).then( ( res ) => {
                        console.log( res )
                        close( false )
                        router.reload()
                    } )
                } )
            } )
            return
        }
        if(id) {
            console.log( editPosts )
            console.log( editQuestions )
            axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }/posts/update/${ id }`, editPosts ).then( ( res ) => {
                console.log( res )
                close( false )
                router.reload()
            } )
            return
        }
        storage.ref( `/images/${ posts.ulid }` ).put( image as File ).on( "state_changed", ( snapshot ) => console.log( snapshot ), alert, () => {
            console.log( posts.ulid )
            storage.ref( "images" ).child( posts.ulid as string ).getDownloadURL().then( url => posts.image = url as string ).then( () => {
                console.log( posts )
                axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }/posts/create`, posts ).then( ( res ) => {
                    console.log( res.data )
                    setCreateModel( true )
                    router.reload()
                    setAllPosts( ( prev: any ) => ( [ ...prev, posts ] ) )
                    close( false )
                } )
            } )
        } )
        console.log( posts )

    }

    const mcqData = ( data: any ) => {
        setMcq( data )
    }

    useEffect( () => {
        if ( !id ) return
    }, [] )

    useEffect( () => {
        console.log( currentIndex )
        if ( settingDone && changeDone ) {
            let object = {
                question: editQuestions![ currentIndex ].question,
                options: mcq
            }
            editPosts.questions![ currentIndex ] = object
            setEditPosts( editPosts )
            console.log( editPosts )
            return
        }
        if ( !id ) {
            let object = {
                question: questions![ currentIndex ].question,
                options: mcq
            }
            posts.questions![ currentIndex ] = object
            setPosts( posts )
            console.log( posts )
        }
    }, [ mcq, settingDone ] )

    useEffect( () => {
        if ( typeof editPosts.questions === 'undefined' ) return
        editPosts.questions!.forEach( ( ques, i ) => {
            if ( ques.options ) {
                setIsMcq( ( prev ) => prev.map( ( pre, idx ) => idx === i ? true : pre ) )
            }
        } )
    }, [ editPosts ] )

    const fate = () => {
        return id ? editQuestions : questions
    }

    return (
        <>
            { allPosts && ( ( id && ( typeof editPosts.name === 'string' ) ) || ( !id ) ) && ( <>
                <Container className="my-4">
                    { <h3 className="my-4"> { editPosts.name || posts.name ? ( id ? `Edit ${ editPosts.name }` : `Create ${ posts.name }` ) : "Create Quiz" } </h3> }
                    { next ? ( <Box sx={ {
                        '& .MuiTextField-root': { my: 1 }
                    } }>
                        { ( id ? editQuestions : questions )!.map( ( question: any, i: number ) => (
                            <div onChange={ () => { setCurrentIndex( i ); setChangeDone( true ) } } key={ i } className="textBox">
                                <TextField autoFocus={ true } onChange={ ( e ) => { handleChange( e, i ) } } className="my-2" value={ question.question } label={ `Question #${ i + 1 }` } multiline fullWidth InputProps={ {
                                    endAdornment: (
                                        <>
                                            <InputAdornment position="end">
                                                {
                                                    <FontAwesomeIcon className="text-green-500 cursor-pointer" icon={ faCheckSquare as IconProp } onClick={ () => { questionType( i ) } } /> }
                                            </InputAdornment>
                                            <InputAdornment position="end">
                                                { i === fate()!.length - 1 && <FontAwesomeIcon onClick={ () => { addQuestion( i ) } } className="text-blue-600 cursor-pointer" icon={ faAdd as IconProp } /> }
                                            </InputAdornment>
                                            <InputAdornment position="end">
                                                { i === fate()!.length - 1 &&
                                                    <FontAwesomeIcon className="text-red-600 cursor-pointer" icon={ faClose as IconProp } onClick={ () => { removeQuestion( i ) } } /> }
                                            </InputAdornment>
                                        </>
                                    ),
                                } } />
                                { ( isMcq[ i ] ) && ( <div className="mb-8">
                                    {/* { ( () => {
                                        if ( id && editPosts.questions![ i ] ) {
                                            if ( editPosts.questions![ i ].options ) {
                                                if ( editPosts.questions![ i ].options!.length > 2 ) {
                                                    return ( <Mcq changer={ [ 1, 2 ] } mcqData={ mcqData } preData={ editPosts.questions![ i ].options } /> )
                                                }
                                            }
                                        }
                                        else {
                                            return ( <Mcq changer={ [ 1, 2 ] } mcqData={ mcqData } /> )
                                        }
                                    } ) } */}
                                    { id && editPosts.questions![ i ] ? <Mcq changer={ [ 1, 2 ] } mcqData={ mcqData } preData={ editPosts.questions![ i ].options } /> : <Mcq changer={ [ 1, 2 ] } mcqData={ mcqData } /> }
                                </div> ) }
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
                        <TextField value={ editPosts.name } onChange={ handleTyping } name="name" className="my-4" fullWidth label="Name" />
                        <TextField value={ editPosts.description } onChange={ handleTyping } name="description" className="my-4" multiline fullWidth label="Description" />
                        <img className="w-full object-contain" src={ id ? `${ editPosts.image }` : posts.image as string } alt="" />
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
            </> ) }
        </>
    )
}

//dist