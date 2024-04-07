import Image from 'next/image'
import React, { ReactNode } from 'react'

export const Empty = ({text,image,children}:{text:string,image?:string,children?:ReactNode}) => {
  return (
    <div className=" flex  items-center p-10 flex-col">
    <h1>{text}</h1>
    <Image width={250} height={250} src={image?image:"/asking.png"} alt="asking" />
    {children}
  </div>
  )
}
