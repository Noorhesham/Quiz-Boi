import React from 'react'

const Generating = ({className}:{className?:string}) => {
  return (
    <div className={`flex items-center text-nowrap absolute text-white font-semibold z-30 h-[1.5rem] md:h-[2.5rem] text-sm px-4 md:px-6 bg-slate-800/80 rounded-[1.7rem] ${className||""} text-base`}>
      <img className='md:w-5 md:h-5 w-3 h-3 mr-4 animate-spin' src={'/loading3.png'} alt="loading" />
      In Progress
    </div>
  )
}

export default Generating
