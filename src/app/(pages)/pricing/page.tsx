import React from "react";
import SubscriptionPlans from "@/components/checkout/SubscriptionPlans";
import { FAQAccordions } from "@/components/FAQ/FAQAccordions";

const FAQs = [
  {
    question: "Can I try GrubbyAI for free?",
    answer:
      "Yes! GrubbyAI offers a free plan that allows you to try out its powerful humanization technology with no costs.",
  },
  {
    question:
      "Are the features of the paid plans different from the free ones?",
    answer:
      "The word limits for each month and each input are different. Apart from that, the effectiveness of humanization and output rewriting quality of all plans will be the same.",
  },
  {
    question: "Will I be charged any hidden fees when I use GrubbyAI?",
    answer:
      "No. Everything you need to pay has been listed on the pricing table above. We guarantee there will be no additional or hidden charges.",
  },
  {
    question: "What payment methods are accepted",
    answer:
      "We accept a wide range of payment methods, e.g. all major credit cards, to make your purchase experience convenient and hassle-free.",
  },
];

const CheckoutPage = async () => {
  return (
    <div className="flex flex-col pt-20 gap-8 bg-[#EBEAFB] min-h-screen">
      <h1 className="w-fit mx-auto text-3xl font-bold text-center">
        Bypass AI Detection Effectively at <br /> Affordable Prices
      </h1>
      <SubscriptionPlans />

      <div className="bg-white flex flex-col py-6 justify-center">
        <h2 className="font-bold text-2xl w-fit mx-auto">FAQs</h2>
        <div className="w-full max-w-[1000px] px-8 mx-auto">
          <FAQAccordions faqs={FAQs} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
