"use client";
import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
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
    <div className="w-fit">
      <select
        className="bg-transparent text-center outline-none border-none text-white"
        value={value}
        onChange={(e) => setValue(e.target.value)}>
        <option value="ver1">Simple</option>
        <option value="ver2">Advanced</option>
      </select>
    </div>
  );
};

export default ModeSelect;
