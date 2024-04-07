import { Button } from '@/components/ui/button'
import React from 'react'

const AddQuestionButton = ({ onClick }: { onClick:any }) => {
  return (
    <div className="space-y-4">
    <Button
      onClick={onClick}
      size="lg"
      className=" my-4 w-full py-5 background text-white"
      type="button"
    >
      Add Question
    </Button>
  </div>
  )
}

export default AddQuestionButton