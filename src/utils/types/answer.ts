import { questionType } from "./question"

export type answerType = {
    ulid? : string,
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
    question?: questionType,
    progress?: boolean
}
//dist
