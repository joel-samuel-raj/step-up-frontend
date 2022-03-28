import router from 'next/router'
import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Questions from '../components/Postman/Questions'
import { UserContext } from '../context/UserContext'
import { User } from '../utils/types/user'

export default function Admin () {

    const user: User = useContext( UserContext )

    // useEffect( () => {
    //     if ( user && !user.isAdmin ) {
    //         router.push( "/" )
    //     }
    // }, [ user ] )

    return (
        <>
            <Navbar />
            <div> { user.isAdmin ? ( <Questions /> ) : ( ( <></> ) ) } </div>
        </>
    )
}
