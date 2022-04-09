import { Box, Container } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { AnswersContext } from '../context/AnswersContext'
import { PostsContext } from '../context/PostsContext'
import { answerType } from '../utils/types/answer'

export default function Winners () {
    const { allAnswers } = useContext( AnswersContext )
    const [ answers, setAnswers ] = useState<answerType[]>( [] )

    useEffect( () => {
        setAnswers( allAnswers.filter( answer => answer.validate === true ) as answerType[] )
    }, [ allAnswers ] )

    return (
        <>
            <Navbar></Navbar>
            <Container>
                <h3> Winners so Far ⚡ </h3>
                { answers.length > 0 && ( <Box className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded justify-center items-center">
                    { answers.map( ( answer, i ) => ( <div className="relative my-4" key={ i }>
                        <div className="relative rounded"> 
                            <div className="top-0 bottom-0 left-0 right-0 bg-purple_heart-500 absolute z-10 opacity-80 rounded"></div>
                            <img src={answer!.question!.image as string} alt="" />
                        </div>
                        <div className="absolute text-white z-20 top-4 left-4">
                            <h3> {answer.userName} </h3>
                            <h4 className="italic"> {answer.question!.name} </h4>
                        </div>
                    </div> ) ) }
                </Box> ) }
            </Container>
        </>
    )
}

//dist
