import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="">
      <div className="bg-blue-600">
        <div className="mx-auto max-w-[841px] px-4 pb-[88px] pt-[86px] text-center text-white lg:py-12">
          <h1
            className="lg:text-[100px] font-extrabold leading-[72px] text-5xl"
            style={{ textShadow: "rgba(0, 28, 43, 0.16) 0px 6px 20px" }}>
            About Us
          </h1>
          <div className="bg-[#1b1746] before:md:bg-blue-400 after:md:bg-blue-400  relative mt-9 rounded-full px-8 py-[18px] before:absolute before:left-8 before:top-1/2 before:h-[14px] before:w-[14px] before:-translate-y-1/2 before:rounded-full after:absolute after:right-8 after:top-1/2 after:h-[14px] after:w-[14px] after:-translate-y-1/2 after:rounded-full ">
            <p>
              Bypass AI, the ultimate solution for creating undetectable and
              humanized AI-generated text
            </p>
          </div>
        </div>
      </div>
      <div className="text-display-secondary mx-auto max-w-[1232px] lg:space-y-24 px-4 lg:pb-[120px] lg:pt-14 space-y-10 pb-8 pt-5">
        <div className="flex  lg:gap-[60px] lg:flex-row flex-col gap-4">
          <div className=" lg:max-w-[660px] lg:space-y-12 lg:ml-0 max-w-full space-y-5">
            <div className="lg:space-y-3 lg:text-lg space-y-2 text-sm">
              <h2 className="text-blue-400 lg:text-3xl font-extrabold text-xl">
                What We Do
              </h2>
              <p>
                Bypass AI is the leading provider of undetectable AI writing
                solutions. Our cutting-edge text humanization technology
                empowers users to make AI-generated text 100% undetectable,
                allowing you to bypass AI detection effortlessly.
              </p>
              <p>
                Our advanced algorithms and machine learning models ensure that
                the text written by our AI system is not only coherent and
                contextually accurate but also completely undetectable by AI
                detectors.
              </p>
            </div>
            <div className="lg:space-y-3 lg:text-lg space-y-2 text-sm">
              <h2 className="text-blue-400 lg:text-3xl font-extrabold text-xl">
                Our Mission
              </h2>
              <p>
                Our mission at Bypass AI is to revolutionize the way
                AI-generated text is perceived and utilized. We believe that AI
                has the potential to enhance various aspects of our lives,
                including content creation, customer support, and more.
              </p>
              <p>
                However, the issue of AI detection has limited the full
                potential of AI-generated text. Our goal is to overcome this
                obstacle by providing a solution that allows users to utilize
                AI-generated content without the fear of detection.
              </p>
            </div>
          </div>
          <img
            alt="What We Do"
            loading="lazy"
            width="402"
            height="386"
            decoding="async"
            className="mx-auto max-w-[200px] w-full lg:max-w-[350px] object-contain h-auto"
            src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/about-us/what-we.jpg"
            style={{ color: "transparent" }}
          />
        </div>
        <div className="flex  lg:gap-[60px] flex-col lg:flex-row gap-4">
          <img
            alt="Why Choose Us"
            loading="lazy"
            width="402"
            height="449"
            decoding="async"
            className="lg:mx-auto order-2 lg:order-1 mx-auto max-w-[200px] lg:max-w-[350px] w-full object-contain h-auto"
            src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/about-us/why-choose-us.jpg"
            style={{ color: "transparent" }}
          />
          <div className="lg:mr-[78px] max-w-[660px] mr-0 lg:max-w-full">
            <h2 className="text-blue-400 lg:text-3xl font-extrabold text-xl">
              Why Choose Us
            </h2>
            <ul className="space-y-6 lg:pt-6 lg:space-y-3 pt-3">
              <li className="lg:space-y-3 space-y-2">
                <h3 className="text-display lg:text-xl font-bold text-base">
                  State-of-the-Art Text Humanization Technology
                </h3>
                <p className="lg:text-lg text-sm">
                  Bypass AI harnesses the cutting-edge power of text
                  humanization technology. Our algorithms go beyond simple word
                  replacements and utilize sophisticated techniques to ensure
                  that the rewritten text is virtually indistinguishable from
                  content created by humans.
                </p>
              </li>
              <li className="lg:space-y-3 space-y-2">
                <h3 className="text-display lg:text-xl font-bold text-base">
                  Beat Almost All AI Detectors
                </h3>
                <p className="lg:text-lg text-sm">
                  Our technology has been rigorously tested and proven to bypass
                  almost all AI detectors currently available. By choosing
                  Bypass AI, you gain a competitive edge by utilizing
                  AI-generated text that remains undetected, giving you the
                  freedom to leverage the power of AI without any limitations.
                </p>
              </li>
              <li className="lg:space-y-3 space-y-2">
                <h3 className="text-display lg:text-xl font-bold text-base">
                  One-Click AI Text Transformation
                </h3>
                <p className="lg:text-lg text-sm">
                  With a single click, our advanced algorithms can make your
                  text more humanized, balanced, or readable. Whether you
                  require highly authentic and engaging content, a perfect
                  balance between creativity and information, or improved
                  readability, we've got you covered.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
