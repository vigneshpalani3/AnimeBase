import React from 'react'
import UseGlobalContext from '../context/GlobalContext'
import '../styles/error.css'

const Error = () => {

  const {errorMsg} = UseGlobalContext();

  return (
    <div className='error-box'>
      <div className="err-code">
        {errorMsg.status}
      </div>
      <div className="err-message">
        {errorMsg.message}
      </div>
      <div className="err-type">
        {errorMsg.type}
      </div>
      <div className="err-trace">
        {errorMsg.error || 'something went wrong'}
      </div>
    </div>
  )
}

export default Error