"use client";
import { globalStateAtom } from "@/context/atoms";
import { Progress } from "@material-tailwind/react";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

type Props = {};

const ProgressBar = (props: Props) => {
  const [state, setState] = useAtom(globalStateAtom);

  return (
    <div className="relative w-full  bg-gray-200 rounded">
      <div
        style={{
          width: "100%",
          display: state.openAIFetch.isLoading ? "block" : "none",
        }}
        className="absolute top-0 h-2 rounded shim-red bg-blue-400"></div>
    </div>
  );
};

export default ProgressBar;
