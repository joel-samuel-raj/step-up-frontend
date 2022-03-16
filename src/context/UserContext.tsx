import axios from "axios"
import React, { useState, useEffect, createContext } from "react"
import { User } from "../utils/types/user"

export const UserContext = createContext( {} )
export const UserProvider = ( props: any ) => {
    const [ user, setuser ] = useState<User>( {
        name: "",
        rollNumber: "",
        phoneNumber: "",
        email: "",
        password: "",
        isAdmin : false,
        profilePicture: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDM4OS4zNCAzODkuMzQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4OS4zNCAzODkuMzQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiMxRUE2QzY7IiBkPSJNMzQ3LjQxNSwzMzAuM2MwLDAuMDQsMCwwLjA4LDAsMC4xM2MtNDAuMzcsMzYuNjEtOTMuOTYsNTguOTEtMTUyLjc0LDU4LjkxDQoJYy01OC43OSwwLTExMi4zOC0yMi4zLTE1Mi43NS01OC45MWMwLTAuMDUsMC0wLjA5LDAtMC4xM2MwLTYwLjg5LDM1LjYzLTExMy40NSw4Ny4xNy0xMzcuOThjMTkuMzcsMTkuMzIsNDIuMDUsMjkuNzMsNjUuNTgsMjkuNzMNCgljMjMuNTQsMCw0Ni4yMS0xMC40MSw2NS41OS0yOS43M0MzMTEuODA1LDIxNi44NSwzNDcuNDE1LDI2OS40MSwzNDcuNDE1LDMzMC4zeiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZDRDA5RjsiIGQ9Ik0xOTQuNjc1LDBjNDYuNjYsMCw4NC40OSwzNy44Miw4NC40OSw4NC40OGMwLDQ2LjY3LTM3LjgzLDExMC40OS04NC40OSwxMTAuNDkNCglzLTg0LjQ5LTYzLjgyLTg0LjQ5LTExMC40OUMxMTAuMTg1LDM3LjgyLDE0OC4wMTUsMCwxOTQuNjc1LDB6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
    } )
    useEffect( () => {
        const getuser = async () => {
            await axios.get( "server/auth/local/users", {
                withCredentials: true
            } ).then( ( res ) => {
                if ( Object.keys( res.data ).length > 0 ) {
                    setuser( res.data )
                }
            } )
            await axios.get( "server/auth/google/users", {
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