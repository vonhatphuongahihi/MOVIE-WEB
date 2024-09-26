import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

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
