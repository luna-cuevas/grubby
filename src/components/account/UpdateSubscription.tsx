"use client";
import { globalStateAtom } from "@/context/atoms";
import { loadStripe } from "@stripe/stripe-js";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";

type Props = {};

const UpdateSubscription = (props: Props) => {
  const [state, setState] = useAtom(globalStateAtom);
  const router = useRouter();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  const handleSubscription = async () => {
    if (state.isSubscribed === false) {
      router.push("/pricing");
      return;
    }
    try {
      const stripe = await stripePromise;

      const response = await fetch("/api/createCheckout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: state.user?.id,
          cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/account`,
          successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/account`,
        }),
      });
      const data = await response.json();
      if (data.sessionId) {
        stripe?.redirectToCheckout({ sessionId: data.sessionId });
      } else if (data.url) {
        router.push(data.url);
      }
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
        onClick={handleSubscription}
        className="text-blue-600 hover:text-blue-400 text-sm">
        Choose your plan
      </button>
    </div>
  );
};

export default UpdateSubscription;
