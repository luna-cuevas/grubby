import UpdateSubscription from "@/components/account/UpdateSubscription";
import WordsAvailable from "@/components/account/WordsAvailable";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="text-f-text mx-auto max-w-[800px] py-12 md:px-4 md:py-6">
      <div className="mx-auto mb-5 text-center text-3xl font-semibold">
        Account
      </div>
      <div className="mx-auto max-w-[744px]">
        <UpdateSubscription />
        <WordsAvailable />
      </div>
    </div>
  );
};

export default page;
