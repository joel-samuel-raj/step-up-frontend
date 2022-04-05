export type questionType = {
    _id?: string,
    name?: string,
    ulid?: string,
    description?: string
    image?: string | ArrayBuffer | null
    questions?: [ {
        question : string,
        options?: [{
            value: string,
            answer: boolean
        }]
    } ]
    open?: boolean
}

//dist
