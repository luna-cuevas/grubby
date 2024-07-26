"use client";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Tooltip, Typography } from "@material-tailwind/react";
import React from "react";

type Props = {
  content: string;
};

const Tooltips = (props: Props) => {
  return (
    <Tooltip
      placement="bottom"
      className="relative bg-white flex hover:cursor-pointer  text-black"
      content={
        <div className="w-80 ">
          <Typography variant="small" className="font-normal opacity-80">
            {props.content}
          </Typography>
        </div>
      }>
      <InformationCircleIcon className="h-6 w-6" />
    </Tooltip>
  );
};

export default Tooltips;
