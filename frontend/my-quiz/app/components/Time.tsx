import React from 'react'
import { FcAlarmClock } from 'react-icons/fc'

const Time = ({duration,className}:{duration:number,className?:string}) => {
  return (
    <div className={` text-sm text-nowrap flex items-center gap-1 font-semibold ${className||"text-gray-600"}`}>
    <FcAlarmClock />
    Duration:{duration} min
  </div>
  )
}

export default Time
