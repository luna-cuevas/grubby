import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  AccordionHeader,
  AccordionBody,
  Accordion,
} from "@material-tailwind/react";
import {
  EllipsisHorizontalCircleIcon,
  UserCircleIcon,
  ChevronDownIcon,
  LifebuoyIcon,
  PowerIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
// import { trajanLight, trajanRegular } from "@/lib/fonts";
import { useAtom } from "jotai";
import { globalStateAtom, initialState } from "@/context/atoms";
import { useSupabase } from "@/lib/supabase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { openSans } from "@/fonts/openSans";

type Props = {};

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    url: "/account",
  },
  {
    label: "History",
    icon: BookOpenIcon,
    url: "/history",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [state, setState] = useAtom(globalStateAtom);
  const supabase = useSupabase();
  const path = usePathname();

  const handleSignOut = async () => {
    // Sign out from Supabase
    await supabase.auth.signOut();

    // Clear session and user from global state
    setState(initialState);

    console.log("Signed out successfully");

    // Close the menu
    closeMenu();
  };

  const closeMenu = () => setIsProfileMenuOpen(false);

  return (
    <Menu
      open={isMenuOpen}
      allowHover={state.session != null}
      handler={!state.session ? undefined : setIsMenuOpen}
      placement="bottom-end">
      <MenuHandler>
        {state.session == null ? (
          <div className="lg:flex hidden items-center gap-6 text-sm font-bold">
            <Link
              href="/login"
              className={`hover:bg-blue-600 hover:border-blue-600 h-8 rounded border-2 bg-transparent shadow-none ${
                state.isScrolled
                  ? "border-blue-600 text-blue-600 hover:text-white"
                  : "border-white text-white "
              } 
                  ${
                    path != "/" &&
                    "!text-blue-600 !border-blue-600 hover:!text-white"
                  }
               
               border-opacity-60  px-5 py-[5px]`}>
              Login
            </Link>
            <Link
              href="/sign-up"
              className="bg-blue-600 hover:bg-blue-800  h-8 rounded px-5 py-[5px] text-white">
              Start for free
            </Link>
          </div>
        ) : state.user?.user_metadata.avatar_url ? (
          <Avatar
            variant="circular"
            size="xs"
            alt={state.user?.user_metadata.full_name || "Profile Picture"}
            className="p-0  h-auto hidden lg:block"
            src={state.user?.user_metadata.avatar_url}
          />
        ) : (
          <UserCircleIcon
            className={`${
              state.showMobileMenu || state.isScrolled
                ? "text-black font-bold"
                : "text-white"
            } 
              ${path != "/" && "!text-black"}
                h-6 w-6 cursor-pointer hidden lg:block`}
          />
        )}
      </MenuHandler>
      <MenuList
        className={`p-1 hidden lg:flex lg:flex-col border-none ${
          state.darkMode ? "bg-cypress-green" : "bg-white"
        }`}>
        {state.session == null
          ? null
          : profileMenuItems.map(({ label, icon, url }, key) => {
              const isLastItem = key === profileMenuItems.length - 1;
              return (
                <MenuItem
                  key={label}
                  onClick={label === "Sign Out" ? handleSignOut : closeMenu}
                  className={`flex items-center gap-2 rounded ${
                    isLastItem
                      ? "hover:bg-red-500 hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 focus:bg-red-500 active:bg-red-500"
                      : "hover:bg-opacity-80 active:bg-gray-300 focus:bg-gray-300 hover:bg-gray-300"
                  }`}>
                  {React.createElement(icon, {
                    className: `h-4 w-4 ${
                      state.darkMode ? "text-white" : "text-black"
                    }`,
                    strokeWidth: 2,
                  })}
                  <Link
                    href={label === "Sign Out" ? "" : url || ""}
                    className={`font-bold w-full ${
                      state.darkMode ? "text-white" : "text-black"
                    }`}>
                    {label}
                  </Link>
                </MenuItem>
              );
            })}
      </MenuList>

      {state.session == null ? (
        <div className="mt-2 flex w-full items-center mx-auto gap-3 px-4 lg:hidden font-bold">
          <Link
            className="hover:bg-blue-600 w-1/2 hover:border-blue-300 text-blue-600 border-blue-600  text-primary h-[44px] rounded border px-5 py-[10px] text-center hover:text-white"
            href="/login">
            Log In
          </Link>
          <Link
            className="bg-blue-600 hover:bg-blue-800 w-1/2 rounded px-5 py-[10px] text-center text-white"
            href="/sign-up">
            Start for Free
          </Link>
        </div>
      ) : (
        <Accordion
          className="lg:hidden w-full  justify-center items-center gap-2 border-b border-gray-200"
          open={true}
          animate={{
            unmount: {
              height: "0px",
            },
          }}>
          {" "}
          <AccordionHeader
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="hover:bg-opacity-80 items-center focus:bg-cypress-green-light pt-[9px] pb-2 px-2 active:bg-cypress-green-light hover:bg-cypress-green-light mx-auto w-full lg:py-[0.35rem] lg:hidden flex justify-left flex-grow border-none">
            <li
              className={`${
                path == "/" ? "lg:text-white text-black" : "text-black"
              }  relative group-hover:text-black dark:group-hover:text-white dark:text-gray-200 flex gap-1 font-bold  text-sm box-content`}>
              {state.user?.user_metadata.avatar_url ? (
                <div className="flex gap-4">
                  <p className={`font-bold text-base ${openSans.className}`}>
                    Profile
                  </p>
                  <Avatar
                    variant="circular"
                    size="sm"
                    alt={
                      state.user?.user_metadata.full_name || "Profile Picture"
                    }
                    className="p-0 w-[25px] h-auto"
                    src={state.user?.user_metadata.avatar_url}
                  />
                </div>
              ) : (
                <EllipsisHorizontalCircleIcon className="w-6 h-6" />
              )}
            </li>
          </AccordionHeader>
          <AccordionBody className="w-full pt-[9px] pb-2">
            <ul className={`flex flex-col  w-full gap-1 px-auto my-1 `}>
              {profileMenuItems &&
                profileMenuItems.map(
                  ({
                    label,
                    url,
                    icon,
                  }: {
                    label: string;
                    url?: string;
                    icon: any;
                  }) => (
                    <MenuItem
                      key={label}
                      className="flex px-2 rounded-none hover:bg-opacity-80  active:bg-cypress-green-light focus:bg-cypress-green-light hover:bg-cypress-green-light justify-left lg:justify-left items-center ">
                      {label == "Sign Out" ? (
                        <div className="flex gap-2">
                          <li
                            onClick={handleSignOut}
                            className={`${
                              path == "/"
                                ? "lg:text-white text-black"
                                : "text-black"
                            }  underline-animation relative group-hover:text-black dark:group-hover:text-white dark:text-gray-200 flex uppercase text-xs box-content`}>
                            {label}
                          </li>
                          {React.createElement(icon, {
                            className: `h-4 w-4 ${
                              state.darkMode ? "text-white" : "text-black"
                            }`,
                            strokeWidth: 2,
                          })}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Link href={url || ""}>
                            <li
                              className={`${
                                path == "/"
                                  ? "lg:text-white text-black"
                                  : "text-black"
                              }  underline-animation relative group-hover:text-black dark:group-hover:text-white dark:text-gray-200 flex uppercase text-xs box-content`}>
                              {label}
                            </li>
                          </Link>
                          {React.createElement(icon, {
                            className: `h-4 w-4 ${
                              state.darkMode ? "text-white" : "text-black"
                            }`,
                            strokeWidth: 2,
                          })}
                        </div>
                      )}
                    </MenuItem>
                  )
                )}
            </ul>
          </AccordionBody>
        </Accordion>
      )}
    </Menu>
  );
}

export default ProfileMenu;
