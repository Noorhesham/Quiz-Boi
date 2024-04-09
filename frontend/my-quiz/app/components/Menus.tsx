import { useCloseModal } from "@/hooks/useCloseModel";
import React, { createContext, useState, useContext } from "react";
import { createPortal } from "react-dom";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";

type MenuContextType = {
  OpenId: string | null;
  Position: { x: number; y: number } | null;
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
  closeMenu: () => void;
  openMenu: (id: string) => void;
};

const MenuContext = createContext<MenuContextType>({
  OpenId: null,
  Position: null,
  setPosition: () => {},
  closeMenu: () => {},
  openMenu: () => {},
});

function Menus({ children }: { children: React.ReactNode }) {
  const [OpenId, setIsOpen] = useState<string | null>(null);
  const [Position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const closeMenu = () => setIsOpen(null);
  const openMenu = (id: string) => setIsOpen(id);

  const value = { OpenId, Position, setPosition, closeMenu, openMenu };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

function Menu({ children }: { children: React.ReactNode }) {
  return <div className="relative flex items-center justify-end">{children}</div>;
}

function Toggle({ id }: { id: string }) {
  const { openMenu, closeMenu, OpenId, setPosition, Position } = useContext(MenuContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = window.innerWidth - rect.width - rect.x;
    const y = rect.y + rect.height + 8;
    setPosition({ x, y });
    OpenId === "" || OpenId !== id ? openMenu(id) : closeMenu();
  }

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer bg-none border-none p-3 rounded-sm translate-x-2 transition-all duration-75 hover:bg-gray-100"
    >
      <HiOutlineEllipsisVertical className="w-10 h-10 text-gray-700" />
    </button>
  );
}

function List({ children, id }: { children: React.ReactNode; id: string }) {
  const { OpenId, Position, closeMenu } = useContext(MenuContext);
  const ref = useCloseModal(closeMenu, false);

  if (OpenId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      style={{ right: Position?.x || 0, top: Position?.y || 0 }}
      className="absolute z-50 bg-gray-0 shadow-md rounded-md"
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, icon, onClick, disabled = false }: { children: React.ReactNode; icon: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  const { closeMenu } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    closeMenu();
  }

  return (
    <li className="flex">
      <button
        disabled={disabled}
        onClick={handleClick}
        className="item w-[100%] text-left bg-none border-none py-5 px-10 text-2xl transition-all duration-75 flex items-center gap-8 hover:bg-gray-50 [&>svg]:w-6 [&>svg]:h-6 [&>svg]:text-gray-400 [&>svg]:transition-all [&>svg]:duration-[0.3s]"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
