"use client";
import { globalStateAtom } from "@/context/atoms";
import { BoltIcon } from "@heroicons/react/24/solid";
import { loadStripe } from "@stripe/stripe-js";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { stripe } from "@/lib/stripe";
import { useSupabase } from "@/lib/supabase";

type Props = {
  subscription: any;
};

const UpdateSubscription = (props: Props) => {
  const { subscriptionName, startDate, renewalDate, price, interval } =
    props.subscription;
  const [state, setState] = useAtom(globalStateAtom);
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customer_id");
  const supabase = useSupabase();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  const handleSubscription = async () => {
    if (state.isSubscribed.status === false) {
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

  // useEffect(() => {
  //   if (customerId) {
  //     const updateSubscription = async () => {
  //       const retrieveCheckout = await stripe.checkout.sessions.retrieve(
  //         customerId
  //       );

  //       const subscription = retrieveCheckout.subscription;

  //       const retrieveSubscription = await stripe.subscriptions.retrieve(
  //         subscription as string
  //       );

  //       const priceId = retrieveSubscription.items.data[0].price.id;

  //       const retrievePrice = await stripe.prices.retrieve(priceId, {
  //         expand: ["product"],
  //       });

  //       // @ts-ignore
  //       const productName = retrievePrice.product.name;
  //       // @ts-ignore
  //       const subInterval = retrievePrice.recurring.interval;

  //       const { data, error } = await supabase
  //         .from("profiles")
  //         .update({
  //           subscription_plan: productName,
  //           wordsMax:
  //             subInterval === "month"
  //               ? // @ts-ignore
  //                 retrievePrice.product.metadata.wordsPerMonth
  //               : // @ts-ignore
  //                 retrievePrice.product.metadata.wordsPerMonth * 12,
  //           // @ts-ignore
  //           inputMax: retrievePrice.product.metadata.inputMax,
  //           priceId,
  //           interval: subInterval,
  //           subscription_id: subscription,
  //           stripe_customer_id: retrieveCheckout.customer as string,
  //         })
  //         .eq("id", state.user.id);

  //       if (error) {
  //         console.error("Error updating profile:", error.message);
  //       } else {
  //         setState((prev) => ({
  //           ...prev,
  //           isSubscribed: {
  //             status: true,
  //             interval: subInterval,
  //             planName: productName,
  //           },
  //         }));
  //         console.log("Profile updated successfully:", data);
  //       }
  //     };

  //     updateSubscription();
  //   }
  // }, [customerId]);

  return (
    <div className=" overflow-hidden rounded-[8px] border bg-white p-8 md:px-6">
      <div className="mb-2 font-semibold">Your Subscription</div>
      {subscriptionName && startDate && renewalDate && price && interval ? (
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div className="text-display/[0.65] text-xs">
              <div className="mb-1 ">Your Plan</div>
              <div className="text-display/[0.85] flex items-center gap-x-1 text-sm font-semibold">
                <div className="capitalize">
                  {subscriptionName} -{" "}
                  {interval === "month" ? "Monthly" : "Yearly"}
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={handleSubscription}
                className="bg-blue-600 text-white hover:bg-blue-400 flex h-[34px] min-w-[99px] items-center justify-center rounded-[4px] text-sm font-semibold">
                <span className="inline-flex justify-center items-center h-4 w-4">
                  <BoltIcon />
                </span>
                Upgrade
              </button>
            </div>
          </div>

          <div className="mb-5">
            <div className="text-display/[0.65] mb-1 text-xs">
              {interval == "month" ? "Monthly" : "Yearly"} Payment
            </div>
            <div className="text-display/[0.85] text-lg font-semibold">
              ${price}
            </div>
          </div>

          <div className="mb-5">
            <div className="text-display/[0.65] mb-[2px] text-xs">
              Renewal Date
            </div>
            <div className="text-display/[0.85] flex items-center gap-x-1 text-sm font-semibold">
              {renewalDate.split("T")[0]}
            </div>
          </div>

          <div className="mb-5 flex justify-between">
            <div>
              <div className="text-display/[0.65] mb-[2px] text-xs">
                Subscription started on
              </div>
              <div className="text-display/[0.85] text-sm font-semibold">
                {startDate.split("T")[0]}
              </div>
            </div>
          </div>

          <div className="border-f-border mt-5 border-t pt-5">
            <div className="pb-2 text-sm font-semibold">Payment method</div>
            <div className="text-display/[0.85] mb-3 text-xs">
              Cards will be charged either at the end of the month or whenever
              your balance exceeds the usage threshold. All major credit / debit
              cards accepted.
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubscription}
                className="bg-blue-600 text-white hover:bg-blue-400 h-[34px] min-w-[101px] rounded text-sm font-semibold">
                <span>Changes</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-f-text-secondary mb-5 text-sm">
            You have not subscribed to any AI Humanizer plan.
          </div>
          <Link
            href="/pricing"
            type="button"
            className="text-blue-600 hover:text-blue-400 text-sm">
            Choose your plan
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpdateSubscription;
