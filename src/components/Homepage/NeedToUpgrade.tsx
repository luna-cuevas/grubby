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
      className={`h-full  w-full mx-auto  z-[1000] bg-black bg-opacity-50  ${
        state.wordLimitReached ? "flex fixed top-0 bottom-0" : "hidden"
      }`}>
      <div className="m-auto  w-fit p-8 bg-gray-200 rounded-lg">
        <div className="text-2xl font-bold text-center">
          You need to upgrade to access this feature
        </div>
        <div className="text-center mt-5 flex gap-4 justify-center">
          <button
            type="button"
            onClick={() => {
              setState((prev) => ({ ...prev, wordLimitReached: false }));
              router.push("/pricing");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Upgrade
          </button>
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded-lg"
            onClick={() =>
              setState((prev) => ({ ...prev, wordLimitReached: false }))
            }>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeedToUpgrade;
