import React from 'react'
import { Link } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';
import iconImage from "../assets/loro.jpg"

export default function CardEmployees({name, image, rol}) {
  return (
    <div className="w-full md:w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-end px-4 pt-4">
    <SettingsIcon sx={{ fontSize: 20, cursor: "pointer" }} />
    </div>
    <div className="flex flex-col justify-center items-center pb-10">
        <img className="w-20 h-20 mb-3 rounded-full shadow-lg flex justify-center items-center" src={image} alt="Imagen"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{rol}</span>
        <div className="mt-5 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 gap-3">
            {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a> */}
            <img src={iconImage} alt="" className='w-12 h-12 rounded-full'/>
            <Link to='chat' className="">Ir al Chat</Link>
        </div>
    </div>
</div>
  )
}
