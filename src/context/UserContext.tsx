import axios from "axios"
import React, { useState, useEffect, createContext } from "react"
import { User } from "../utils/types/user"
import jwt_decode from "jwt-decode";
import { postsImage } from "../assets/images/posts"

export const UserContext = createContext( {} )
export const UserProvider = ( props: any ) => {
    const [ user, setuser ] = useState<User>( {
        name: "",
        rollNumber: "",
        phoneNumber: "",
        email: "",
        password: "",
        isAdmin : false,
        profilePicture: postsImage,
        data : "unauthenticated"
    } )
    useEffect( () => {
        const getuser = async () => {
            // await axios.get( `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/local/users`, {
            //     withCredentials: true
            // } ).then( ( res ) => {
            //     if ( Object.keys( res.data ).length > 0 ) {
            //         setuser( res.data )
            //     }
            // } )
            let localToken = localStorage.getItem('local_user')
            if ( localToken ) {
                let user: User = jwt_decode( JSON.parse(localToken).access_token )
                setuser( user )
                if ( user.data as string === 'wrong password' ) {
                    alert('Wrong Password Please Try Again !')
                }
                return
            } 
            await axios.get( `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/users`, {
                withCredentials: true
            } ).then( ( res ) => {
                if ( Object.keys( res.data ).length > 0 ) {
                    setuser( res.data )
                }
            } )
        }
        getuser()
    }, [] )
    return (
        <UserContext.Provider value={ user }>
            { props.children }
        </UserContext.Provider>
    )
}