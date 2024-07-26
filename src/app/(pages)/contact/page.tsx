import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="">
      <div className="bg-blue-400">
        <div className="px-4 lg:py-[135px] text-center text-white py-12">
          <h1
            className="lg:text-[100px] font-extrabold leading-[72px] text-5xl "
            style={{ textShadow: "rgba(0, 28, 43, 0.16) 0px 6px 20px" }}>
            Contact Us
          </h1>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1096px] items-center gap-x-12 px-4 pb-[128px] pt-2 md:pb-10 md:pt-8">
        <img
          alt="Contact Us"
          loading="lazy"
          width="330"
          height="535"
          decoding="async"
          className="hidden lg:flex"
          src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/contact-us.jpg"
          style={{ color: "transparent" }}
        />
        <div className=" mx-auto lg:mr-auto max-w-[690px] rounded-[32px] border-[2px] border-[#1B1746] bg-white lg:p-16 px-[22px] py-9">
          <h2 className="text-display flex items-center gap-2 lg:text-4xl font-extrabold text-2xl">
            We are excited to receive your message!
          </h2>
          <p className="text-display-secondary pt-3 lg:text-xl text-sm">
            If you have any questions, require assistance, or wish to share
            feedback, we are available to assist you. Don&apos;t hesitate to
            contact us at{" "}
            <a
              href="mailto:contact@grubby.ai"
              className="text-blue-400 hover:underline">
              contact@grubby.ai
            </a>
            . Our team is committed to offering you timely and valuable support.
            We are eager to engage with you!
          </p>
          <a
            href="mailto:contact@grubby.ai"
            className="bg-blue-600 hover:bg-blue-400 mt-6 block w-full rounded-full px-6 py-3 text-center text-xl font-bold text-white lg:mt-3">
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
};

export default page;
