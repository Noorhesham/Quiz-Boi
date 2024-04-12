import React from 'react'
import DialogCustom from './DialogCustom';
import Confirm from './Confirm';
import { Button } from '@/components/ui/button';
import { FaTrash } from 'react-icons/fa';

const DeleteQuizBtn = ({quiz}:{quiz:any}) => {
    return (
        <DialogCustom
          title="Delete Your Quiz?"
          content={<Confirm quiz={quiz._id} />}
          btn={
            <Button className=" text-gray-800 flex gap-3 items-center hover:bg-green-200 duration-150 text-sm md:text-xl  bg-white rounded-xl self-end">
              Delete Quiz <FaTrash className=" hover:text-red-300 duration-150 text-red-500 cursor-pointer  " />
            </Button>
          }
        />
      );
}

export default DeleteQuizBtn