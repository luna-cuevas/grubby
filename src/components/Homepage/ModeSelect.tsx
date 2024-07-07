"use client";
import React, { useState } from "react";
import { Select, Option } from "@material-tailwind/react";

type Props = {};

const ModeSelect = (props: Props) => {
  const [value, setValue] = useState<string | undefined>("Simple");

  return (
    <div className="w-fit">
      <select
        className="bg-transparent outline-none border-none text-white"
        value={value}
        onChange={(e) => setValue(e.target.value)}>
        <option value="Simple">Simple</option>
        <option value="Standard">Standard</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  );
};

export default ModeSelect;
