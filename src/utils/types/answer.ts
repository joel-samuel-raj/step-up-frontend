import { questionType } from "./question"

export type answerType = {
    _id?: string,
    userName?: "",
    userId?: "",
    questionId?: "",
    answers?: [{
        answer?: string,
        options?: [ {
            value: string,
            answer: boolean
        }]
    }],
    validate?: boolean,
    star?: boolean,
    userEmail?: string,
    userPhone?: number,
    question?: questionType
}