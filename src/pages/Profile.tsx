import React, {useContext} from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../context/UserContext'
import Questions from '../components/Postman/Questions'
import { User } from '../utils/types/user'

const Profile = () => {

  const user: User = useContext(UserContext);
  const admin = () => {
    if ( user.isAdmin! ) {
        return <Questions />
      }
    }
  return (
    <>
      <Navbar />
      { admin() }
    </>

  )
}

export default Profile
