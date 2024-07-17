"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAtom } from "jotai";
import { globalStateAtom } from "@/context/atoms";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutButton: React.FC<{ priceId: string }> = ({ priceId }) => {
  const [state, setState] = useAtom(globalStateAtom);
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch("/api/createCheckout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        userId: state.user.id,
        successUrl: `${window.location.origin}/pricing`,
        cancelUrl: `${window.location.origin}/pricing`,
      }),
    });

    const data = await response.json();

    console.log("data", data);

    const stripe = await stripePromise;

    if (data.sessionId) {
      stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } else if (data.url) {
      router.push(data.url);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white p-4 rounded w-full">
      Subscribe
    </button>
  );
};

export default CheckoutButton;
