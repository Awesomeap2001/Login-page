import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
    <div className="container" style={{height : "80vh"}}>
      <div className='h-100 d-flex align-items-center justify-content-center'>
        <div className='text-center'>
          <h1 className='pb-0 mb-0'><strong>404 Error</strong> </h1>
          <h2>WE ARE SORRY, PAGE NOT FOUND</h2>
          <p className='fs-5'>The Page you are looking for is currenty Unavailable.</p>
          <br /><br />
          <NavLink to="/"><button className='btn btn-primary'>Back to Homepage</button> </NavLink>
          
        </div>

      </div>
    </div>
    </>
  )
}

export default ErrorPage