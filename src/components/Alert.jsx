import React from 'react'

export default function Alert({message}) {
  return (
    <div className="absolute rounded-md border-2 border-[#4242428f] p-2 -top-20 text-red-500"><span>{message}</span></div>
  )
}
