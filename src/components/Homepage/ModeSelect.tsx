"use client";
import React, { useEffect, useState } from "react";
import { Select, Option, Tooltip } from "@material-tailwind/react";
import { useAtom } from "jotai";
import { globalStateAtom } from "@/context/atoms";

type Props = {};

const ModeSelect = (props: Props) => {
  const [value, setValue] = useState<any>("ver1");
  const [state, setState] = useAtom(globalStateAtom);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      humanizerVersion: value,
    }));
  }, [value]);

  return (
    <div className="flex">
      <Tooltip
        className="bg-white p-4 text-gray-800"
        placement="right-end"
        content={
          <div className="max-w-[300px] md:max-w-[400px] space-y-1 text-xs">
            <div>
              <div>
                <span className="font-semibold">Simple V1:</span> Good writing,
                less detectable by AI.
              </div>
            </div>
            <div>
              <div>
                <span className="font-semibold">Advanced V2:</span> Great
                writing, sometimes detectable by AI.
              </div>
            </div>
          </div>
        }>
        <label className="text-white text-sm flex gap-1">
          Mode{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-3 my-auto">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
          :
        </label>
      </Tooltip>
      <select
        className="bg-transparent text-sm w-fit max-w-none text-center outline-none border-none text-white"
        value={value}
        onChange={(e) => setValue(e.target.value)}>
        <option value="ver1">Simple V1 </option>
        <option value="ver2">Advanced V2</option>
      </select>
    </div>
  );
};

export default ModeSelect;
