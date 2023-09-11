import React from 'react'

export default function SendMessage() {
  return (
    <div className=' bg-[#313338] flex justify-center items-center w-[95%] h-[80%] rounded-lg text-white '>
        <input className=' bg-[#40414F] rounded py-2 px-3 focus:outline-none w-full' type="text" placeholder='Escribe mensaje a #general'/>
    </div>
  )
}


