"use client";
import { UserProps } from "@/types";
import DropDownMenu from "./DropDownMenu";
import MiniLink from "./MiniLink";
import { AnimatePresence, motion } from "framer-motion";
import { useLogOut } from "@/utils/queryFunctions";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Avatar = ({ user }: { user: UserProps }) => {
  const { logout } = useLogOut();
  const router = useRouter();
  return (
    <AnimatePresence>
      <DropDownMenu>
        <DropDownMenu.Toggle id="nav">
          <motion.img
            key="toggle-nav"
            className="rounded-full w-[3rem] h-[3rem]"
            alt={`${user.name}-Avatar`}
            src={user.photo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </DropDownMenu.Toggle>
        <DropDownMenu.Menu id="nav">
          <motion.ul
            key="menu-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white z-[999999999999] duration-200 gap-4 shadow-md text-gray-800 fixed w-[20rem] rounded-lg border-[1px] border-gray-200 flex flex-col items-center py-5 px-8 top-[3.6rem] right-10"
          >
            <div>
              <Link className=" flex flex-col gap-2 items-center" href={"/my-profile"}>
                <motion.img
                  key="menu-avatar"
                  className="rounded-full w-[4rem] h-[4rem]"
                  alt={`${user.name}-Avatar`}
                  src={user.photo}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.h6
                  key="menu-username"
                  className="text-gray-700 hover:underline duration-150"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {user.name}
                </motion.h6>
              </Link>
            </div>
            <div className="self-start">
              <MiniLink href={`/my-quizzes?upload`} text="Upload New Quiz" />
              <MiniLink href={`/my-quizzes`} text="My Quizzes" />
              <MiniLink href={`/my-attempts`} text="Attempted Quizzes" />
              <MiniLink href={`/my-profile`} text="Account Settings" />
              <div className="border-t-2 border-gray-200">
                <MiniLink
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  text="Log out"
                />
              </div>
            </div>
          </motion.ul>
        </DropDownMenu.Menu>
      </DropDownMenu>
    </AnimatePresence>
  );
};

export default Avatar;
