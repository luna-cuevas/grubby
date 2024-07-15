"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutButton: React.FC<{ priceId: string }> = ({ priceId }) => {
  const handleClick = async () => {
    const response = await fetch("/api/createCheckout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        successUrl: `${window.location.origin}/payment-confirmation`,
        cancelUrl: `${window.location.origin}/checkout`,
      }),
    });

    const data = await response.json();

    if (data.sessionId) {
      const stripe = await stripePromise;
      stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      console.error("Failed to create checkout session:", data.error);
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
