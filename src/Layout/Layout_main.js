import React from 'react'
import Footer from './Footer/Footer'
import NavbarMain from './Navbar/NavBar_main'

function LayoutMain({children}) {
  return (
   <>
    <div className='min-h-screen flex flex-col bg-main text-white'>
        <NavbarMain />
        {children}
        <Footer />
    </div>
   </>
  )
}

export default LayoutMain
