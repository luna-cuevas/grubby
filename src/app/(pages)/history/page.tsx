import HistoryCards from "@/components/history/HistoryCards";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="mx-auto py-12 md:py-6 bg-gray-200 min-h-screen">
      <div className="mb-5 text-center text-6xl font-bold md:text-3xl">
        History
      </div>
      <div className="flex flex-col gap-y-5 lg:gap-y-3">
        <HistoryCards />
      </div>
    </div>
  );
};

export default page;
