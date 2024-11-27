import React from 'react'
import Footer from './Footer/Footer'
import Navbar from './Navbar/NavBar'

function Layout({children}) {
  return (
   <>
    <div className='min-h-screen flex flex-col bg-main text-white'>
        <Navbar />
        {children}
        <Footer />
    </div>
   </>
  )
}

export default Layout
