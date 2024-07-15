"use client";

import React, { useEffect, useState } from "react";
import CheckoutCard from "./CheckoutCard";

interface Plan {
  id: string;
  name: string;
  description: string;
  prices: {
    id: string;
    currency: string;
    unit_amount: number;
    frequency: string;
  }[];
}

const SubscriptionPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMonthly, setIsMonthly] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await fetch("/api/getPlans");
      const data = await response.json();
      console.log(data);
      setPlans(data.plans);
      setLoading(false);
    };

    fetchPlans();
  }, []);

  const filteredPlans = plans.filter((plan) =>
    plan.prices.some(
      (price) => price.frequency === (isMonthly ? "month" : "year")
    )
  );

  if (loading) {
    return <div>Loading...</div>;
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
      <div className="flex pt-16 lg:flex-row flex-wrap px-4 justify-center gap-4 mt-4 ">
        {filteredPlans.map((plan) => (
          <CheckoutCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
