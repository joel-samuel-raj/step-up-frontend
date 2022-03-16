import { TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Update ({id}: {id: string}) {
    useEffect( () => {
        axios.get( `/server/posts/${ id }` ).then( ( response ) => {
            let arr = response.data[0].questions
            setQuestions( arr )
            console.log(arr)
        })
    }, [] )
    const [questions, setQuestions] = useState([])
  return (
      <>
          {questions.length && questions.map( ( {question}, i ) => (
            <TextField key={i} className="my-2" value={question} />
          ))}
      </>
  )
}
