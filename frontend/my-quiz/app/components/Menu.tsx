import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiEllipsisVertical } from "react-icons/hi2";
import DialogCustom from "./DialogCustom";
import Confirm from "./Confirm";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useComment } from "../context/CommentContext";

const Menu = ({ comment }: { comment: any }) => {
  console.log(comment);
  const { setIsEdit, setComment } = useComment();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="text-lg  ml-auto bg-transparent ocus-visible:ring-0 shadow-none outline-none  hover:bg-transparent hover:text-gray-500 duration-200"
        >
          <HiEllipsisVertical className="text-gray-700 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 flex flex-col items-start">
        <DropdownMenuGroup className=" w-full">
          <DropdownMenuItem>
            <DialogCustom
              content={<Confirm comment={true} questionId={comment._id} />}
              btn={
                <DropdownMenuShortcut
                  onClick={(e) => e.stopPropagation()}
                  className="flex w-full items-center gap-2 cursor-pointer"
                >
                  {" "}
                  <FaTrash className=" hover:text-red-300 duration-150 text-red-500 cursor-pointer  " /> Delete Comment
                </DropdownMenuShortcut>
              }
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuGroup  className=" w-full">
          <DropdownMenuItem>
            <DropdownMenuShortcut
              onClick={(e) => {
                e.stopPropagation();
                setComment(comment.content);
                setIsEdit(comment._id);
              }}
              className="flex w-full items-center gap-2 cursor-pointer"
            >
              {" "}
              <MdModeEdit className=" hover:text-green-300 duration-150 text-green-500 cursor-pointer" /> Edit Comment
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
