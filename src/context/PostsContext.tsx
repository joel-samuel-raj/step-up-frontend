import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { questionType } from "../utils/types/question"

type context = {
    allPosts : [questionType],
    setAllPosts: any
}

export const PostsContext = createContext<context>( { allPosts: [{}], setAllPosts: () => {} } )
export const PostsProvider = ( props: any ) => {
    const [ allPosts, setAllPosts ] = useState<[questionType]>( [{}] )
    useEffect( function () {
        axios.get( `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/getPosts` ).then( res => {setAllPosts( res.data )
        console.log(res.data)
        } )

    }, [] )
    return (
        <PostsContext.Provider value={{ allPosts, setAllPosts }}>
            { props.children }
        </PostsContext.Provider>
    )
}