import {motion} from'framer-motion'
import { container } from '../motion'
import { ReactNode } from 'react'

const Motion = ({children,className}:{children:ReactNode,className?:string}) => {
  return (
    <motion.div className={`${className||""}`}  variants={container}>
      {children}
    </motion.div>
  )
}

export default Motion
