"use client";
import { useGetUser } from "@/utils/queryFunctions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { IoCreate, IoLibrary, IoSettings } from "react-icons/io5";

const Menus = [
  { name: "Home", icon: <GoHomeFill />, dis: "translate-x-0", href: "/",index:0 },
  { name: "Create", icon: <IoCreate />, dis: "translate-x-16", href: "my-quizzes",index:1  },
  { img: "/logo.png", dis: "translate-x-32", href: "logo" },
  { name: "Settings", icon: <IoSettings />, dis: "translate-x-48", href: "my-profile",index:2  },
  { name: "Played", icon: <BsFillCollectionPlayFill />, dis: "translate-x-64", href: "my-attempts" ,index:3 },
];
const PhoneNav = () => {
  const { user } = useGetUser();
  const pathName=usePathname()
  const [active, setActive] = useState(0);
  useEffect(() => {
    const index = Menus.findIndex(menu => pathName === `/${menu.href}`);
    setActive(index !== -1 ? index : 0);
    console.log(index,active,pathName)
  }, [pathName]);
  if (!user) return null;
  return (
    <div className="bg-gray-100 min-h-[4rem] md:hidden block fixed bottom-0 z-50 w-full px-6 rounded-t-2xl">
      <ul className="flex relative w-full mx-auto">
        <span
          className={`bg-rose-600 duration-500 ${Menus[active].dis} border-4 border-rose-600 h-16 w-16 absolute
       -top-5 rounded-full `}
        >
          <span
            className="w-[25px] h-2.5 bg-transparent absolute top-[21px]  -left-[29px] 
        rounded-tr-[4px] rounded-tl-[6px] shadow-myShadow1"
          ></span>
          <span
            className="w-[25px] h-2.5 bg-transparent absolute top-[21px]  -right-[29px] 
        rounded-tl-[4px] shadow-myShadow2 rounded-tr-[4px]"
          ></span>
        </span>
        {Menus.map((menu, i) => (
          <li key={i} className="w-16">
           {menu.img ? (
                <img className=" w-10 pt-2 m-auto" src={menu.img} alt="" />
              ): <Link
              href={`/${menu.href}`}
              className="flex ml-auto flex-col items-center text-center pt-6"
              onClick={() => setActive(i)}
            >
                <>
                  <div
                    className={`text-xl cursor-pointer duration-500 text-gray-300 ${
                      i === active && "-mt-6  text-gray-800"
                    }`}
                  >
                    {menu.icon}
                  </div>
                  <div
                    className={` ${
                      active === i
                        ? "translate-y-5 text-gray-800  duration-700 opacity-100"
                        : "opacity-0 text-pink-400 translate-y-10"
                    } `}
                  >
                    {menu.name}
                  </div>
                </>
              
            </Link>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneNav;
