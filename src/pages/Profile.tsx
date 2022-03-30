import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../context/UserContext'
import Questions from '../components/Postman/Questions'
import { User } from '../utils/types/user'
import { Box, Container } from '@mui/material'
import { AnswersContext } from '../context/AnswersContext'
import { PostsContext } from '../context/PostsContext'
import { answerType } from '../utils/types/answer'

const Profile = () => {

  const user: User = useContext( UserContext )
  const {allAnswers} = useContext( AnswersContext )

  const admin = () => {
    if ( user.isAdmin! ) {
      return <Questions />
    }
  }
  const answers = allAnswers.filter( answer => answer.userId === user._id )
  const [ ans, setAns ] = useState<answerType[]>( [ {} ] )

  useEffect( () => {
    let arr = allAnswers.filter( ( answer ) => answer.userId === user._id ) as [ answerType ]
    console.log( arr )
    setAns( ( prev ) => ( [ ...arr ] ) )
    console.log( ans )
  }, [ allAnswers ] )

  return (
    <>
      <Navbar />
      { ans.length > 0 ? ( <> {
        ans[ 0 ].question && ( <Container className="my-6 py-6 border-b-2 border-purple-900 rounded">
          <h3> All Responses 📚 </h3>
          { ans.map( ( answer, i ) => ( <div key={ i }>
            <p> { '👉🏼' + answer.question!.name } </p>
          </div> ) ) }
        </Container> ) }
        { ans[ 0 ].question && ( <Container className="my-6 py-6 border-b-2 border-purple-900 rounded">
          <h3> Watch List ⭐ </h3>
          { ans.map( ( answer, i ) => {
            if ( answer.star ) {
              return ( <div key={ i }>
                <p> { '👉🏼' + answer.question!.name } </p>
              </div> )
            }
          } ) }
        </Container> ) }
        { ans[ 0 ].question && ( <Container className="my-6 py-6 border-b-2 border-purple-900 rounded">
          <h3> Winning Responses 😍 </h3>
          { ans.map( ( answer, i ) => {
            if ( answer.validate ) {
              return ( <div key={ i }>
                <p> { '👉🏼' + answer.question!.name } </p>
              </div> )
            }
          } ) }
        </Container> )  
        } </> ) : ( <> 
          <Container>
            <h2> Submit a Response ! </h2>
          </Container>
        </> )
    }
    </>
  )
}

export default Profile
