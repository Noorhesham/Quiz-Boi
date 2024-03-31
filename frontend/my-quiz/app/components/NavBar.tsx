import { getUser } from "@/actions/getUser";
import React from "react";

const NavBar = async () => {
  const user = await getUser();

  console.log("user", user);
  return <div>NavBar</div>;
};

export default NavBar;
