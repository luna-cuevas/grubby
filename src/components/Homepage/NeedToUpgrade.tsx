"use client";
import { globalStateAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const NeedToUpgrade = (props: Props) => {
  const [state, setState] = useAtom(globalStateAtom);
  const router = useRouter();
  return (
    <div
      className={`h-full  w-full mx-auto  z-[1000] bg-black bg-opacity-50 px-4 ${
        state.limitReachPopup ? "flex fixed top-0 bottom-0" : "hidden"
      }`}>
      <div className="m-auto max-w-[600px]  w-fit p-8 bg-gray-200 rounded-lg">
        <div className="flex flex-col items-center  text-center">
          <span className="inline-flex justify-center text-blue-600 fill-blue-600 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8">
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <p className="pb-5 pt-4 lg:text-2xl text-lg">
            Sorry, you've reached your plan's word limit. To get more words,
            please <span className="text-blue-600">upgrade</span> your plan.
          </p>
        </div>
        <div className="text-center mt-5 flex gap-4 justify-center">
          <button
            type="button"
            onClick={() => {
              setState((prev) => ({ ...prev, limitReachPopup: false }));
              router.push("/pricing");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Upgrade Now
          </button>
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded-lg"
            onClick={() =>
              setState((prev) => ({ ...prev, limitReachPopup: false }))
            }>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeedToUpgrade;
