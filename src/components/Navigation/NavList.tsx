"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuItem, Switch, Typography } from "@material-tailwind/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { globalStateAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import ProfileMenu from "./ProfileMenu";
import NavItem from "./NavItem";

// const shopCategories = [
//   {
//     title: "All",
//     url: "/shop",
//   },
//   {
//     title: "Pants",
//     url: "/shop/pants",
//   },
//   {
//     title: "Shirts",
//     url: "/shop/shirts",
//   },
// ];

const navListItems = [
  // {
  //   label: "Shop",
  //   isDropdown: true,
  //   shopCategories,
  // },
  {
    label: "Anti AI Detector",
    url: "/",
  },
  {
    label: "Pricing",
    url: "/pricing",
  },
  // {
  //   label: "Cart",
  //   url: "/cart",
  // },
];

const NavList = ({}: {}) => {
  const [state, setState] = useAtom(globalStateAtom);
  const path = usePathname();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.darkMode);
  }, [state.darkMode]);

  return (
    <ul className="z-[10000000] h-[calc(100vh-70px)] relative border-t border-gray-200 lg:border-t-0 flex max-w-screen lg:w-screen lg:h-[70px] justify-between flex-col gap-2 lg:flex-row lg:items-center">
      <div className="lg:w-[80%] z-[1000000] w-full mx-auto mt-auto h-full flex justify-between">
        <Link
          href="/"
          className={`
            ${state.isScrolled ? "text-black" : "text-white"}
          relative hidden lg:block my-auto  text-xl`}>
          {/* <Image
            src="/cypress-logo-with-text.svg"
            alt="Cypress Logo"
            fill
            loading="eager"
            className={`${
              path == "/" ? "invert" : "invert-0"
            } w-full h-full !object-contain dark:invert group-hover:invert-0 dark:group-hover:invert pt-2`}
          /> */}
          Grubby.ai
        </Link>
        <div className="lg:w-fit !z-[3000000] lg:items-center items-start py-4 lg:py-0   px-4 bg-white lg:bg-transparent w-full flex lg:gap-2 gap-6 lg:flex-row flex-col">
          {navListItems.map(({ label, url }, key) => (
            <NavItem key={key} label={label} url={url} />
          ))}
          <ProfileMenu />

          {/* <div className="flex gap-3 lg:py-[0.45rem] pt-[9px] pb-2 px-2 items-center lg:mx-0 mx-auto">
            <SunIcon
              opacity={state.darkMode ? "0.5" : "1"}
              className={`h-5 w-5 `}
            />
            <Switch
              id="dark-mode"
              name="dark-mode"
              checked={state.darkMode}
              onChange={(event) => {
                setState({ ...state, darkMode: event.target.checked });
              }}
              crossOrigin={undefined}
            />
            <MoonIcon
              opacity={state.darkMode ? "1" : "0.3"}
              className={` h-5 w-5`}
            />
          </div> */}
        </div>
      </div>
    </ul>
  );
};

export default NavList;
