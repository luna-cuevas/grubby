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
    label: "AI Humanizer",
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
            ${path != "/" && "!text-black"}
           hidden lg:block my-auto `}>
          <div className="relative w-[120px] mx-auto h-[50px]">
            <Image
              src="/images/grubby-logo.png"
              alt="Grubby Logo"
              fill
              className={`${path != "/" ? "invert-0" : "invert"}
                ${
                  state.showMobileMenu || state.isScrolled
                    ? "invert-0"
                    : "invert"
                }
                
                w-full h-full !object-contain group-hover:invert-0  dark:invert dark:group-hover:invert pt-2`}
            />
          </div>
        </Link>
        <div className="lg:w-fit !z-[3000000] lg:items-center items-start py-4 lg:py-0   px-4 bg-white lg:bg-transparent w-full flex lg:gap-2 gap-6 lg:flex-row flex-col">
          {navListItems.map(({ label, url }, key) => (
            <NavItem key={key} label={label} url={url} />
          ))}
          <ProfileMenu />

          {state.isSubscribed.planName === "free" && (
            <Link
              href="/pricing"
              className="bg-blue-600 lg:hidden hover:bg-blue-800 w-full rounded px-5 py-[10px] text-center text-white">
              Upgrade Now For $4.99
            </Link>
          )}

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
