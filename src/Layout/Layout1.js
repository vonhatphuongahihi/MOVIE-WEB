import React from 'react'
import Footer from './Footer/Footer'
import Navbar1 from './Navbar/NavBar1'

function Layout1({children}) {
  return (
   <>
    <div className='min-h-screen flex flex-col bg-main text-white'>
        <Navbar1 />
        {children}
        <Footer />
    </div>
   </>
  )
}

export default Layout1
