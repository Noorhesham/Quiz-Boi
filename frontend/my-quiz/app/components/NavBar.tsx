"use client";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import MiniLogo from "./MiniLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetUser } from "@/utils/queryFunctions";
import { useColor } from "../context/ColorContext";
import { Skeleton } from "@/components/ui/skeleton";
import MaxWidthWrapper from "./MaxWidthWrapper";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const { color } = useColor();
  const { user, isLoading, error } = useGetUser();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        setNav(true);
      } else {
        setNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        nav ? "bg-gray-200  bg-opacity-45 shadow-md duration-150" : " bg-transparent"
      } fixed z-50 top-0 left-0 w-full transition-all ease-in-out`}
    >
      <div className="flex  mx-auto   max-w-[1375px] py-5   px-4 md:px-10  items-center justify-between w-full">
        <MiniLogo />
        <div className="flex items-center gap-2 md:gap-10">
          {isLoading ? (
            <Skeleton className="h-12 w-12 rounded-full" />
          ) : user ? (
            <Avatar user={user} />
          ) : (
            !user && (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <button className="bg-none   shadow-none mr-3 md:mr-0 text-nowrap font-normal text-white">
                    Log in
                  </button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-white hover:bg-pink-600  text-gray-800 text-nowrap hover:text-white hover:opacity-95 duration-150 rounded-full">
                    Sign up
                  </Button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
