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
  const { allAnswers } = useContext( AnswersContext )
  const { allPosts } = useContext( PostsContext )

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
          <Box className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded justify-center items-center"> 
            { ans.map( ( answer, i ) => {
              return allPosts.find( ( post ) => post._id === answer.questionId ) ? ( <div key={ i } >
                <div className="relative my-4">
                  <div className="relative rounded">
                    <div className="top-0 bottom-0 left-0 right-0 bg-purple_heart-500 absolute z-10 opacity-80 rounded"></div>
                    <img src={ answer!.question!.image as string } alt="" />
                  </div>
                  <div className="absolute text-white z-20 top-4 left-4">
                    <h4 className="italic"> { answer.question!.name } </h4>
                  </div>
                </div>
              </div> ) : ( <> </> )
          } ) }
        </Box>
        </Container> ) }
        { ans[ 0 ].question && ( <Container className="my-6 py-6 border-b-2 border-purple-900 rounded">
          <h3> Watch List ⭐ </h3>
          <Box className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded justify-center "> 
            { ans.map( ( answer, i ) => {
              return allPosts.find( ( post ) => post._id === answer.questionId && answer.star ) ? ( <div key={ i } >
                <div className="relative my-4">
                  <div className="relative rounded">
                    <div className="top-0 bottom-0 left-0 right-0 bg-purple_heart-500 absolute z-10 opacity-80 rounded"></div>
                    <img src={ answer!.question!.image as string } alt="" />
                  </div>
                  <div className="absolute text-white z-20 top-4 left-4">
                    <h4 className="italic"> { answer.question!.name } </h4>
                  </div>
                </div>
              </div> ) : ( <> </> )
          } ) }
        </Box>
        </Container> ) }
        { ans[ 0 ].question && ( <Container className="my-6 py-6 border-b-2 border-purple-900 rounded">
          <h3> Winning Responses 😍 </h3>
          <Box className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded justify-center items-center"> 
            { ans.map( ( answer, i ) => {
              return allPosts.find( ( post ) => post._id === answer.questionId && answer.validate ) ? ( <div key={ i } >
                <div className="relative my-4">
                  <div className="relative rounded">
                    <div className="top-0 bottom-0 left-0 right-0 bg-purple_heart-500 absolute z-10 opacity-80 rounded"></div>
                    <img src={ answer!.question!.image as string } alt="" />
                  </div>
                  <div className="absolute text-white z-20 top-4 left-4">
                    <h4 className="italic"> { answer.question!.name } </h4>
                  </div>
                </div>
              </div> ) : ( <> </> )
          } ) }
        </Box>
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

//dist
