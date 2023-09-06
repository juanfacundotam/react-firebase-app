import React from 'react'
import logo from "../assets/TAMCO.webp";
export default function Logo() {
  return (
    <div className="w-96 h-20 my-5 overflow-hidden flex justify-start items-center">
    <img src={logo} alt="imagen del logo" className="w-96" />
  </div>
  )
}
