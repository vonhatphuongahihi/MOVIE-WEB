import React from 'react'
import Footer from './Footer/Footer'
import NavbarGuest1 from './Navbar/NavBarGuest1'

function LayoutGuest1({children}) {
  return (
   <>
    <div className='min-h-screen flex flex-col bg-main text-white'>
        <NavbarGuest1 />
        {children}
        <Footer />
    </div>
   </>
  )
}

export default LayoutGuest1
