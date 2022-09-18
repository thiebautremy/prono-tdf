import React from 'react'
import './errorMessage.scss'
const ErrorMessage = ({message}: any) => {
    return(
        <h5 className='errorMessage'>{message}</h5>
    )
}

export default ErrorMessage