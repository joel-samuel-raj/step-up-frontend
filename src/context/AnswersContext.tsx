import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { answerType } from "../utils/types/answer"

type context = {
    allAnswers : [answerType],
    setAllAnswers: any
}

export const AnswersContext = createContext<context>({ allAnswers: [{}], setAllAnswers: () => {} })
export const AnswersProvider = ( props: any ) => {
    const [ allAnswers, setAllAnswers ] = useState<[ answerType ]>( [ {} ] )
    useEffect( () => {
        axios.get( `${ process.env.NEXT_PUBLIC_BACKEND_URL }/posts/answers/get` ).then( res => {
            setAllAnswers( res.data )
            console.log(res.data)
        } )
    }, [])
    return (
        <AnswersContext.Provider value={ {allAnswers, setAllAnswers} }>
            {props.children}
        </AnswersContext.Provider>
    )
}