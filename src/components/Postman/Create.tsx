import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Button, Container, InputAdornment, Snackbar, TextField } from '@mui/material'
import axios from 'axios'
import router, { Router } from 'next/router'
import React, { useState, useReducer, useEffect } from 'react'
import { ulid } from 'ulid'

export default function Create ({name, id}: {name?: string, id?: string}) {
    const [ , forceUpdate ] = useReducer( x => x + 1, 0 )
    const [ questions, setQuestions ] = useState( [  "question #1" ] )
    const [ editQuestions, setEditQuestions ] = useState( [ "question #1"  ] )
    const [ createModel, setCreateModel ] = useState( false )

    const addQuesion = ( i: number ) => {
        if ( id ) {
            setEditQuestions((prev) => [...prev,  `question #${ setQuestions.length + 1 }`])
        }
        setQuestions( ( prev ) => [ ...prev,  `question #${ questions.length + 1 }` ] )
    }

    useEffect( () => {
        if(!id) return
        axios.get( `/server/posts/${ id }` ).then( ( response ) => {
            let arr = response.data[0].questions
            setEditQuestions( arr )
            console.log(arr)
        })
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
        }
        forceUpdate()
    }

    const submit = () => {
        if ( id ) {
            console.log(editQuestions)
            axios.post( "server/posts/update", {id: id, editQuestions} ).then( ( res ) => {
                console.log(res)
            })
            return
        }
        axios.post( "server/posts/create", { name: name, questions: questions } ).then( (res) => {
            console.log(res)
            setCreateModel( true )
            router.reload()
        } )
    }

    const fate = () => {
        return id ? editQuestions : questions
    }

    return (
        <>
            <Container className="my-4">

                 {(id ? editQuestions : questions).map( ( question: any, i: number ) => (
                    <TextField autoFocus={true} key={ i } onChange={ ( e ) => { handleChange( e, i ) } } className="my-2" value={question} label={ `Question #${ i + 1 }` } multiline fullWidth InputProps={ {
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
                {id ? (<Button className="float-right" onClick={ () => { submit() } }>
                    Confirm Changes
                </Button>) : (<Button className="float-right" onClick={ () => { submit() } }>
                    Post Quiz
                </Button>)}
            </Container>
            <Snackbar open={ createModel } autoHideDuration={ 6000 } onClose={ () => {setCreateModel(false)} }>
                <Alert onClose={ () => {setCreateModel(false)} } severity="success" sx={ { width: '100%' } }>
                    Post Created Succesfully 😍
                </Alert>
            </Snackbar>
        </>
    )
}
