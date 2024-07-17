"use client";
import { globalStateAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React, { use, useEffect } from "react";

type Props = {};

const UpdateSubscription = (props: Props) => {
  const [state, setState] = useAtom(globalStateAtom);

  const createCheckoutSession = async () => {
    try {
      const response = await fetch("/api/createCheckout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: state.user?.id,
        }),
      });
      const data = await response.json();
      console.log("data", data);
      window.location.href = data.url;
    } catch (error) {
      console.error("Error creating checkout session: ", error);
    }
  };

  return (
    <div className=" overflow-hidden rounded-[8px] border bg-white p-8 md:px-6">
      <div className="mb-2 font-semibold">Your Subscription</div>
      <div className="text-f-text-secondary mb-5 text-sm">
        You have not subscribed to any AI Humanizer plan.
      </div>
      <button
        type="button"
        onClick={createCheckoutSession}
        className="text-blue-600 hover:text-blue-400 text-sm">
        Choose your plan
      </button>
    </div>
  );
};

export default UpdateSubscription;
