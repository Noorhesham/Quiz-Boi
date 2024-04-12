"use client"
import { useGetTags } from '@/utils/queryFunctions'
import React from 'react'
import Spinner from './Spinner'
import CategoreyCard from './CategoreyCard'

const AllCategories = ({setCategorey}:{setCategorey:any}) => {
   const {tags,isLoading}= useGetTags()
   if(isLoading) return <Spinner/>
  return (
    <div className=" grid grid-cols-1 gap-5 sm:grid-cols-2 justify-center  mx-auto ">
        {tags.map((tag:any)=><CategoreyCard  setCategorey={setCategorey} tag={tag} />)}
    </div>
  )
}

export default AllCategories