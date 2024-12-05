import React from 'react'
import Footer from './Footer/Footer'
import NavbarGuest from './Navbar/NavBarGuest'

function LayoutGuest({children}) {
  return (
   <>
    <div className='min-h-screen flex flex-col bg-main text-white'>
        <NavbarGuest />
        {children}
        <Footer />
    </div>
   </>
  )
}

export default LayoutGuest
