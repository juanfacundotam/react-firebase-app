import React from 'react'

export default function UpBar() {
  return (
    <div className='flex justify-between items-center w-[98%] h-full'>
        <div><h1>#General</h1></div>
        <div className='flex justify-between items-center gap-3 '>
            <h1>%</h1>
            <h1>%</h1>
            <h1>%</h1>
            <h1>%</h1>
            <div className=' flex justify-between items-center bg-[#40414F] rounded   ' >
            <input type="text" className='bg-[#40414F] rounded py-1 pl-3 focus:outline-none ' />
<h1 className=' px-2 cursor-pointer'>#</h1>
            </div>
            <h1>%</h1>
            <h1>%</h1>
            <h1>%</h1>
        </div>
    </div>
  )
}
