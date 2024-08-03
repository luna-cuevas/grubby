"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  Collapse,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon, Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
// import { trajanLight, trajanRegular } from "@/lib/fonts";
import Image from "next/image";
import { useAtom } from "jotai";
import { globalStateAtom } from "@/context/atoms";

const NavItem = ({ label, url }: { label: string; url?: string }) => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [state, setState] = useAtom(globalStateAtom);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 960) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (label === "AI Humanizer" && path === "/") {
    return (
      <button
        key={label}
        onClick={() => {
          setState((prev) => ({ ...prev, showMobileMenu: false }));
        }}
        className="justify-center h-fit w-full lg:w-fit lg:mx-auto lg:m-0 border-b border-gray-200 lg:border-none">
        <MenuItem className="flex px-2  rounded-none hover:bg-transparent hover:text-light-blue-600 hover:bg-opacity-80  lg:justify-center items-center gap-2">
          <li
            className={` underline-animation ${
              state.showMobileMenu || state.isScrolled
                ? "text-black font-bold"
                : "text-white"
            }  
              ${path != "/" && "!text-black"}
            relative flex `}>
            {label}
          </li>
        </MenuItem>
      </button>
    );
  }

  return (
    <Link
      key={label}
      href={url || "/"}
      className="justify-center h-fit w-full lg:w-fit lg:mx-auto lg:m-0 border-b border-gray-200 lg:border-none">
      <MenuItem className="flex px-2  rounded-none hover:bg-transparent hover:text-light-blue-600 hover:bg-opacity-80  lg:justify-center items-center gap-2">
        <li
          className={` underline-animation ${
            state.showMobileMenu || state.isScrolled
              ? "text-black font-bold"
              : "text-white"
          }  
              ${path != "/" && "!text-black"}
            relative flex `}>
          {label}
        </li>
      </MenuItem>
    </Link>
  );
};

export default NavItem;
