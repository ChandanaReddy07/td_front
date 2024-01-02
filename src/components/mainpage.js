import React from 'react'
import Navbar from './Navbar'

const MainPage = ({ children }) => {

  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}

export default MainPage