import React from 'react'
import Message from './BodyComponents/Message'
import Perfil from './BodyComponents/Perfil'

export default function BodyMessage({datos, image}) {
  return (
    <>
    <Perfil datos={datos} image={image}/>
    <Message datos={datos} image={image}/>
    </>
  )
}
