import React from "react";
import CheckoutButton from "./CheckoutButton";

interface Plan {
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
  plan: Plan;
};

const CheckoutCard = (props: Props) => {
  const plan = props.plan;

  const descriptionParts = plan.description.split(".");

  const formattedDescription = descriptionParts.map((line) => (
    <p key={line} className="flex gap-1 items-center">
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
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
      {line}
    </p>
  ));

  return (
    <div
      className={`relative flex ${
        plan.name === "Unlimited" && "mt-16 lg:mt-auto"
      }`}>
      {plan.name === "Unlimited" && (
        <div className="absolute left-0 bottom-[98%] z-0 border-2 border-purple-600 w-full h-[60px] rounded-t-xl items-center flex justify-center text-center text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500">
          Most Popular
        </div>
      )}
      {plan.name === "Unlimited" && plan.prices[0].frequency === "year" && (
        <div className="absolute -right-[5%]  w-fit bottom-[103%] z-[100] rotate-[40deg] bg-[#FFD600] px-4 text-sm font-semibold text-[#1B1746] ">
          SAVE 50%
        </div>
      )}
      <div
        className={`
        ${plan.name === "Unlimited" && "border-2 border-purple-600"}
        relative flex flex-col z-20  rounded-xl bg-white px-9 pb-9 pt-6 text-left transition-all duration-100 w-full md:w-fit lg:w-fit lg:px-9 border  lg:mt-0`}>
        <div className="border-b border-gray-200 pb-4 ">
          <h2 className="text-2xl font-semibold">{plan.name}</h2>
          <p className="my-2 text-blue-600 capitalize">
            {plan.words} per month
          </p>
          <p className="text-lg">
            <span className="font-bold text-2xl mr-1">$</span>
            <span className="text-4xl font-bold">
              {plan.prices[0].frequency === "year"
                ? Math.ceil((plan.prices[0].unit_amount / 100 / 12) * 100) / 100
                : plan.prices[0].unit_amount / 100}
            </span>{" "}
            per{" "}
            {plan.prices[0].frequency == "year"
              ? "month"
              : plan.prices[0].frequency}{" "}
          </p>
        </div>

        <div className="my-4 flex-1">{formattedDescription}</div>

        {plan.prices.map((price) => (
          <div key={price.id}>
            <CheckoutButton priceId={price.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutCard;
