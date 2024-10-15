import React from 'react'
import Footer from './Footer/Footer'
import Navbar from './Navbar/NavBar'

function Layout({children}) {
  return (
   <>
    <div className='bg-main text-white'>
        <Navbar />
        {children}
        <Footer />
    </div>
   </>
  )
}

export default Layout
