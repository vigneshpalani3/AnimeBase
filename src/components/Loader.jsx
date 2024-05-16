import React from 'react'
import {ThreeDots} from 'react-loader-spinner'
import '../styles/loader.css'

const Loader = () => {
  return (
    <div className='loader'>
      <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="rgba(3, 94, 168, 0.802)"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
    </div>
  )
}

export default Loader