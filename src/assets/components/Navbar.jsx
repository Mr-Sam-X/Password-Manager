import React from 'react'

const Navbar = () => {
  return (

          <nav className='bg-slate-800 text-white flex justify-around items-center h-15 fixed top-0 w-lvw'> 
          <div className="logo font-bold text-2xl">
            <span className='text-green-700'>&lt;</span>
            Pass
            <span className='text-green-700'>OP&gt;</span>
          </div>
       <div className="git flex items-center gap-2 bg-green-800 py-2 px-4 rounded-lg">
        <img className='invert w-8' src="github.svg" alt="" />
        <span className='text-lg'>GitHub</span>
       </div>
    </nav>
    
  )
}

export default Navbar
