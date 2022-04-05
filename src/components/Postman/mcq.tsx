import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Checkbox, TextField } from '@mui/material'
import React, { useEffect, useReducer, useState } from 'react'
import { ulid } from 'ulid'

export default function Mcq ( { mcqData, changer, preData, ansData, iconFlag, readFlag, inputFlag }: any ) {
    const [ , forceUpdate ] = useReducer( x => x + 1, 0 )
    const [ template, setTemplate ] = useState(
        [ {
            value: "",
            answer: false
        } ]
    )
    const [ flag, setFlag ] = useState( true )
    const [ write, setWrite ] = useState( true )
    const [ input, setInput ] = useState( true )
    const [ correctAns, setCorrectAns ] = useState<any>( {} )
    const handleCheckChange = ( e: any, i: number ) => {
        if ( typeof window !== "undefined" && write ) {
            setTemplate( prevTemplates => prevTemplates.map( ( item, idx ) => idx === i ? { ...item, answer: e.target.checked } : item ) )
            forceUpdate()
        }
    }

    const handleInputChange = ( e: any, i: number ) => {
        if ( typeof window !== "undefined" && write && input ) {
            const newTemplate = [ ...template ]
            newTemplate.splice( i, 1, { ...template[ i ], value: e.target.value as string } )
            setTemplate( newTemplate )
            forceUpdate()
        }
    }

    const addField = () => {
        setTemplate( ( prev ) =>
            [ ...prev, {
                value: "",
                answer: false
            } ]
        )
        forceUpdate()
    }

    const removeField = ( i: number ) => {
        if ( template.length === 1 ) return
        let array = template
        array.splice( i, 1 )
        setTemplate( array )
        forceUpdate()
    }

    useEffect( () => {
        mcqData( template )
    }, [ template ] )

    useEffect( () => {
        if ( preData ) {
            setTemplate( preData )
            console.log( template )
            forceUpdate()
        }
    }, [ ...changer ] )

    useEffect( () => {
        if ( iconFlag === false ) {
            setFlag( iconFlag )
        }
    }, [ iconFlag ] )

    useEffect( () => {
        setWrite( !readFlag )
    }, [ readFlag ] )

    useEffect( () => {
        setInput( !inputFlag )
    }, [ inputFlag ] )

    useEffect( () => {
        setCorrectAns( ansData )
    }, [ ansData ] )

    const colourChange = ( bool: boolean, i: number ) => {
        let classes = "m-2 p-2 rounded"
        if ( !ansData || ( typeof correctAns.options === 'undefined' ) ) return ""
        console.log( bool )
        if ( bool ) {
            return correctAns.options[ i ].answer === bool ? `${ classes } bg-green-200` : `${ classes } bg-red-300`
        }
        if ( correctAns.options[ i ].answer ) {
            return `${ classes } bg-green-200`
        }
    }

    return (
        <div>
            <ul>
                { template.length && template.map( ( item, i ) => (
                    <li key={ i }>
                        { <div className="flex w-full justify-start items-center">
                            <Checkbox className="check" checked={ item.answer } onClick={ ( e ) => { handleCheckChange( e, i ) } } />
                            <span className={ colourChange( item.answer, i ) }>
                                <TextField fullWidth multiline variant="standard" type="text" value={ item.value } placeholder="Type..." onKeyPress={(e) => {
                                    if(e.code === "Enter") {
                                        addField()
                                    }
                                }} onChange={ ( e ) => { handleInputChange( e, i ) } } />
                            </span>
                            <span className="mx-4 grid gap-1 grid-cols-2">
                                { ( i === template.length - 1 && flag ) && <FontAwesomeIcon className="text-red-500" onClick={ () => { removeField( i ) } } icon={ faClose as IconProp } /> }
                                { ( i === template.length - 1 && flag ) && <FontAwesomeIcon className="text-blue-500" icon={ faAdd as IconProp } onClick={ () => { addField() } } /> }
                            </span>
                        </div> }
                    </li>
                ) ) }
            </ul>
        </div>
    )
}

//dist
