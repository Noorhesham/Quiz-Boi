"use client";
import React, { useState } from "react";
import Avatar from "./Avatar";
import MiniLogo from "./MiniLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetUser } from "@/utils/queryFunctions";
import Loader from "./Loader";
import ChooseColor from "./ChooseColor";
import { useColor } from "../context/ColorContext";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const { color } = useColor();
  const { user, isLoading, error } = useGetUser();

  if (isLoading) return <Loader />;

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <header
      className={`${
        nav ? "bg-gray-200 shadow-md duration-150" : ""
      } fixed z-50 top-0 left-0 w-full transition-all ease-in-out`}
    >
      <nav className="py-3 px-8 flex items-center justify-between w-full">
        <MiniLogo />
        <div className="flex items-center gap-10">
          <ChooseColor />
          {user && <Avatar user={user} />}
          {!user && (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="bg-none shadow-none font-normal text-white">Log in</button>
              </Link>
              <Link href="/signup">
                <Button className="bg-white text-gray-800 hover:text-white hover:opacity-95 duration-150 rounded-full">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
