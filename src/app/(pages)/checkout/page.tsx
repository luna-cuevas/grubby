"use client";

import React from "react";
import SubscriptionPlans from "@/components/checkout/SubscriptionPlans";

const CheckoutPage: React.FC = () => {
  return (
    <div className="flex flex-col pt-10 gap-8 bg-[#EBEAFB] min-h-screen">
      <h1 className="w-fit mx-auto text-3xl font-bold text-center">
        Bypass AI Detection Effectively at <br /> Affordable Prices
      </h1>
      <SubscriptionPlans />
    </div>
  );
};

export default CheckoutPage;
