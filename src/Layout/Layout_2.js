import React from 'react'
import Footer from './Footer/Footer'
import Navbar2 from './Navbar/Navbar_2'

function Layout2({children}) {
  return (
   <>
    <div className='bg-main text-white'>
        <Navbar2 />
        {children}
        <Footer />
    </div>
   </>
  )
}

export default Layout2
