"use client";
import { useCloseModal } from "@/hooks/useCloseModel";
import React, { useContext, createContext, useState, ReactNode, RefAttributes, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoMdArrowDropdown } from "react-icons/io";
interface MenuContextType {
  open: string;
  setIsOpen: (id: string) => void;
  openMenu: (id: string) => void;
  closeMenu: () => void;
}

//create the context
const MenuContext = createContext<MenuContextType>({
  open: "",
  setIsOpen: () => {},
  openMenu: () => {},
  closeMenu: () => {},
});

//This is like a framework to implement the functionality of hovering over an element or clicking on it
//and displaying a menu that disappears when hover out or click again or outside or scroll but not on click on that menu
//we will use the compound component stratetgey so that we have a component and other component as a prop on it
//1.first we will create a context to share the open close state between all the compound components
//2.we will make the parent component retur nthe context provider with values of the open state and setIsOpen fn mutating the state
//and 2 fns one for closing and setting the open to empty string and the other for openening and setting the id

const DropDownMenu = ({ children }: { children: ReactNode }) => {
  const [open, setIsOpen] = useState("");
  const openMenu = (id: string) => setIsOpen(id);
  const closeMenu = () => setIsOpen("");
  return <MenuContext.Provider value={{ open, setIsOpen, openMenu, closeMenu }}>{children}</MenuContext.Provider>;
};

//3. we will make a toggle component that returns the children (in this case the hovered or clicked element) extending it and adding the onMouseOver
//and Onclick fns to it
//4.we pass an id to the toggle btn and the same id to the menu , if the current id(the open state) is empty or is != the component id
// we will set isOpen to id (open menu)

function Toggle({ id, children }: { id: string; children: ReactNode }) {
  const { open, openMenu, closeMenu } = useContext(MenuContext);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); //stop the event from travelling further up
    open === "" || open !== id ? openMenu(id) : closeMenu();
    console.log(open);
  };
  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    openMenu(id);
  }
  return (
    <div className="flex  relative gap-3 text-sm items-center ">
      {React.cloneElement(children as React.ReactElement<any>, {
        onMouseOver: handleMouseEnter,
      })}
      {
        <IoMdArrowDropdown
          style={{ transition: "100ms", color: "white" }}
          className={`${open && "rotate-180 transition-all text-white duration-100"}`}
          onClick={(e: any) => handleClick(e)}
        />
      }
    </div>
  );
}
//5.here we check if the id the menu recives it = to the current id and if so we will return the menu in a portal so that in become on top

function Menu({ children, id }: { children: ReactNode; id: string }) {
  const { open, closeMenu } = useContext(MenuContext);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  //this hook is responsible for handling the click on menu not to trigger a close
  const ref = useCloseModal(closeMenu);
  if (open !== id) return;
  return mounted && createPortal(<div ref={ref}>{children}</div>, document.body);
}
DropDownMenu.Toggle = Toggle;
DropDownMenu.Menu = Menu;
export default DropDownMenu;
