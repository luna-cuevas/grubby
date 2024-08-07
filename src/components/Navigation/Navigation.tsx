"use client";
import React, { useEffect, useState } from "react";
import { Navbar, Collapse, IconButton } from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { globalStateAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import { useSupabase } from "@/lib/supabase";
import { usePathname, useRouter } from "next/navigation";
import NavList from "./NavList";

type Props = {
  products?: any[];
};

export const Navigation = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [state, setState] = useAtom(globalStateAtom);
  const supabase = useSupabase();
  const path = usePathname();
  const router = useRouter();

  const yearSubMonthlyReset = async (userId: string) => {
    try {
      const subData = await fetchSubscription(userId);

      const response = await fetch("/api/resetMonthlyLimits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          stripe_customer_id: subData.stripe_customer_id,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching subscription: ", error);
    }
  };

  const fetchSubscription = async (userId: string) => {
    try {
      const response = await fetch("/api/isSubscribed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching subscription: ", error);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setState({ ...state, showMobileMenu: false, isSignUpModalOpen: false });
  }, [path]);

  useEffect(() => {
    const { data: authListener } =
      supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleAuthChange = async (event: any, session: any) => {
    if (
      (event === "SIGNED_IN" ||
        event === "INITIAL_SESSION" ||
        event === "USER_UPDATED" ||
        event === "TOKEN_REFRESHED") &&
      session
    ) {
      const data = await fetchSubscription(session.user.id);

      setState((prev) => ({
        ...prev,
        user: session.user,
        session,
        isSignInOpen: false,
        isSubscribed: {
          status: data.subscription_id != "",
          interval: data.interval || "",
          planName: data.plan_name,
        },
        isSignUpModalOpen: false,
      }));

      await yearSubMonthlyReset(session.user.id);
    } else if (event === "SIGNED_OUT") {
      setState({ ...state, user: null, session: null, isSignInOpen: false });
      router.push("/");
      // toast.success("Signed out");
    } else {
      setState({ ...state, user: null });
    }
  };

  const toggleIsNavOpen = () => {
    setState({ ...state, showMobileMenu: !state.showMobileMenu });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setState((prev) => ({
          ...prev,
          showMobileMenu: false,
          isScrolled: window.scrollY > 0,
        }));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setState((prev) => ({
        ...prev,
        isScrolled: window.scrollY > 0,
      }));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoaded)
    return (
      <nav className="h-16  sticky top-0 w-screen items-center rounded-none shadow-none drop-shadow-none max-w-none py-4 p-0"></nav>
    );

  return (
    isLoaded && (
      <Navbar
        blurred={false}
        variant="filled"
        fullWidth={true}
        className={` 
          ${
            (path == "/sign-up" || path == "/login" || path == "callback") &&
            "hidden"
          }
          ${
            state.showMobileMenu || state.isScrolled
              ? "bg-white"
              : "bg-transparent"
          }  backdrop-blur-0 z-50 h-16 lg:h-auto fixed top-0 w-screen  transition-background-color duration-700 items-center rounded-none shadow-none  drop-shadow-none max-w-none  py-4 p-0`}>
        <Link
          href="/"
          className={`${
            state.showMobileMenu || state.isScrolled ? "text-black" : ""
          } 
            ${path != "/" && "!text-black"}
           z-[1000] items-center  justify-center lg:hidden h-full sm:max-w-[250px] max-w-[180px] absolute left-10 font-bold  flex m-auto top-0 bottom-0`}>
          <div className="relative w-[120px] mx-auto h-full">
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
        <div className="relative my-auto w-full mx-auto h-full max-w-none flex items-center justify-between text-blue-gray-900">
          <div className="hidden w-full lg:flex">
            <NavList />
          </div>
          <div className="w-screen lg:w-full max-w-screen flex justify-end">
            <IconButton
              size="sm"
              variant="text"
              onClick={toggleIsNavOpen}
              className="ml-auto mr-4 lg:hidden max-w-none">
              <Bars2Icon
                className={`${
                  state.showMobileMenu || state.isScrolled
                    ? "text-black"
                    : "text-white"
                } 
                    ${path != "/" && "!text-black"}
                    h-6 w-6  dark:text-white group-hover:text-black dark:group-hover:text-white`}
              />
            </IconButton>
          </div>
        </div>
        <Collapse
          open={state.showMobileMenu}
          className="w-full  z-50 bg-white justify-end ml-auto">
          <NavList />
        </Collapse>
      </Navbar>
    )
  );
};
