import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="h-full py-20">
      <div className="relative py-20 md:py-12">
        <h1 className="relative z-[1] mx-auto max-w-[932px] px-4 lg:text-7xl font-bold text-white text-4xl text-center">
          Refund Policy
        </h1>
        <img
          alt="Refund Policy"
          loading="lazy"
          decoding="async"
          className="object-cover"
          src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/privacy.jpg"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: 0,
            color: "transparent",
          }}
        />
      </div>
      <div>
        <div className="mx-auto flex flex-col gap-2 mt-12 max-w-[932px] px-4 text-sm sm:mt-6 md:mt-10 AgreementPage_agreement__pEx7o">
          <p>
            This Refund Policy governs the refund of payments or parts thereof
            made by clients on our platform, Grubby.ai. We are committed to
            providing the best services for our customers. If, however, you are
            not fully satisfied with our services, we are here to help.
          </p>
          <h2 className="text-xl font-bold">Who Is Eligible for a Refund?</h2>
          <p>
            To be eligible for a refund, you must express your dissatisfaction
            and submit your request within 3 days (72 hours) from the date of
            purchase and if you have not used over 1000 words. Refund requests
            made outside the 3-day (72-hour) window from the purchase date or
            exceeding the 1000 word usage will not be eligible for processing
            according to our policy. Ensure to make your claim within this
            period and under the word usage limit to qualify for a refund.
          </p>
          <h2 className="text-xl font-bold">Refund Process</h2>
          <p>
            To initiate a refund, you must contact our customer support team at{" "}
            <a rel="nofollow" href="mailto:hello@grubby.ai">
              hello@grubby.ai
            </a>{" "}
            with the order details and reason for the refund request. Refunds
            will be processed and issued within 3 business days from the date we
            confirm receipt of your refund request email.
          </p>
          <p>
            Please note: Grubby.ai reserves the right to alter and update this
            Refund Policy from time to time. The effective date noted below
            indicates the last time this policy was revised. We encourage
            customers to review this policy periodically.
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
