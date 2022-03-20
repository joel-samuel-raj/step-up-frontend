import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { questionType } from "../utils/types/question"

export const PostsContext = createContext<[questionType]>( [{}] )
export const PostsProvider = ( props: any ) => {
    const [ posts, setPosts ] = useState<[questionType]>( [{}] )
    useEffect( function () {
        axios.get( "server/posts/getPosts" ).then( res => setPosts( res.data ) )

    }, [] )
    return (
        <PostsContext.Provider value={ posts }>
            { props.children }
        </PostsContext.Provider>
    )
}