import { formatCreatedAt } from '@/utils/date'
import React from 'react'
import { FcOvertime } from 'react-icons/fc'

const Date = ({date,className}:{date:any,className?:string}) => {
  return (
    <h6 className={`  gap-1  mt-2 text-sm flex items-center text-[200] ${className||"text-gray-500 ml-auto"}`}>
    <FcOvertime />
    {formatCreatedAt(date)}
  </h6>
  )
}

export default Date
