export type questionType = {
    _id?: string,
    name?: string,
    description?: string
    image?: string | ArrayBuffer | null
    questions?: string[]
    open?: boolean
}