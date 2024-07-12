import LoginForm from "@/components/SignUpAndLogin/LoginForm";
import SignUpForm from "@/components/SignUpAndLogin/SignUpForm";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex min-h-screen overflow-hidden relative">
      <div className="flex flex-col items-center justify-center px-4 relative flex-[6]">
        <LoginForm />{" "}
        <img
          className="absolute hidden lg:flex right-[81px] translate-x-full "
          src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/a-fly-man.min.png"
          alt=""
        />
      </div>
      <div className=" hidden lg:flex flex-[4] items-center justify-start bg-[#EEEDFD]"></div>
    </div>
  );
};

export default page;
