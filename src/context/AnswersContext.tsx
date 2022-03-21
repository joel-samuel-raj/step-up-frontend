import axios from "axios"
import { createContext, useEffect, useState } from "react"

type answer = {
    _id?: string,
    userName?: "",
    userId?: "",
    questionId?: "",
    answers?: string[],
    validate?: boolean,
    userEmail?: string,
    userPhone?: number
}

export const AnswersContext = createContext<[answer]>([{}])
export const AnswersProvider = ( props: any ) => {
    const [ answers, setAnswers ] = useState<[ answer ]>( [ {} ] )
    useEffect( () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/answers/get`).then(res => setAnswers(res.data))
    }, [])
    return (
        <AnswersContext.Provider value={ answers }>
            {props.children}
        </AnswersContext.Provider>
    )
}