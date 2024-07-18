"use client";

import React, { useEffect, useState } from "react";
import CheckoutCard from "./CheckoutCard";
import { useSearchParams } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { useAtom } from "jotai";
import { globalStateAtom } from "@/context/atoms";
import { useSupabase } from "@/lib/supabase";
interface Plans {
  id: string;
  words: string;

  order: number;
  name: string;
  description: string;
  prices: {
    id: string;
    currency: string;
    unit_amount: number;
    frequency: string;
  }[];
}

type Props = {
  plans?: Plans[];
};

const SubscriptionPlans = (props: Props) => {
  const [plans, setPlans] = useState<Plans[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const updatedSub = searchParams.get("updated");
  const supabase = useSupabase();

  const [state, setState] = useAtom(globalStateAtom);
  const [isMonthly, setIsMonthly] = useState(true);
  const filteredPlans =
    plans &&
    plans.filter((plan) =>
      plan.prices.some(
        (price) => price.frequency === (isMonthly ? "month" : "year")
      )
    );

  useEffect(() => {
    const fetchPlans = async () => {
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseURL}/api/getPlans`, {
        next: { revalidate: 60 }, // Adjust cache settings if needed
      });

      if (!response.ok) {
        console.error("Error fetching plans:", response.statusText);
      }

      const data = await response.json();
      return data.plans;
    };

    fetchPlans()
      .then((data) => {
        setPlans(data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching plans:", error.message);
      });
  }, []);

  useEffect(() => {
    if (updatedSub) {
      const updateSubscription = async () => {
        const retrieveSub = await stripe.subscriptions.search({
          query: `status:"active" AND metadata["userId"]:"${state.user.id}"`,
        });

        const updateSub = retrieveSub.data[0];

        const retrievePrice = await stripe.prices.retrieve(
          updateSub.items.data[0].price.id,
          {
            expand: ["product"],
          }
        );
        // @ts-ignore
        const productName = retrievePrice.product.name;

        const { data, error } = await supabase.from("profiles").update({
          subscription_id: updateSub.id,
          subscription_plan: productName,
          // @ts-ignore
          wordsMax: retrievePrice.product.metadata.wordsPerMonth,
          // @ts-ignore
          inputMax: retrievePrice.product.metadata.inputMax,
          priceId: updateSub.items.data[0].price.id,
        });

        if (error) {
          console.error("Error updating profile:", error.message);
        } else {
          console.log("Profile updated successfully:", data);
        }
      };
      updateSubscription();
    }
  }, [updatedSub]);

  useEffect(() => {
    if (sessionId) {
      const updateSubscription = async () => {
        const retrieveCheckout = await stripe.checkout.sessions.retrieve(
          sessionId
        );

        const subscription = retrieveCheckout.subscription;

        const retrieveSubscription = await stripe.subscriptions.retrieve(
          subscription as string
        );

        const priceId = retrieveSubscription.items.data[0].price.id;

        const retrievePrice = await stripe.prices.retrieve(priceId, {
          expand: ["product"],
        });

        // @ts-ignore
        const productName = retrievePrice.product.name;

        const { data, error } = await supabase
          .from("profiles")
          .update({
            subscription_plan: productName,
            // @ts-ignore
            wordsMax: retrievePrice.product.metadata.wordsPerMonth,
            // @ts-ignore
            inputMax: retrievePrice.product.metadata.inputMax,
            priceId,
            subscription_id: subscription,
          })
          .eq("id", state.user.id);

        if (error) {
          console.error("Error updating profile:", error.message);
        } else {
          console.log("Profile updated successfully:", data);
        }
      };

      updateSubscription();
    }
  }, [sessionId]);

  if (!isLoaded) {
    return (
      <div className="flex items-center text-blue-600 justify-center h-[75vh]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="animate-spin size-8">
          <circle cx={12} cy={12} r={10} />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 3" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto">
      <div className="w-fit mx-auto flex bg-white p-1">
        <button
          type="button"
          onClick={() => setIsMonthly(true)}
          className={`${
            isMonthly ? "bg-blue-600 text-white" : "bg-none"
          } py-2 px-4 rounded-lg font-bold`}>
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setIsMonthly(false)}
          className={`${
            !isMonthly ? "bg-blue-600 text-white" : "bg-none"
          } py-2 px-4 rounded-lg flex gap-2 font-bold`}>
          Yearly{" "}
          <div
            className={`${isMonthly ? "text-[#FA54B1]" : "text-white"}
            flex items-center gap-x-[4px]`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
            Save up to 50%
          </div>
        </button>
      </div>
      <div className="flex py-4 lg:pt-16 lg:flex-row flex-wrap px-4 justify-center gap-4 mt-4 ">
        {filteredPlans.map((plan) => (
          <CheckoutCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
