"use client";
import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Link from "next/link";

const detectors = [
  {
    label: "GPTZero",
    value: "gptzero",
    imgSrc:
      "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/gptzero-banner.jpg",
    imgAlt: "GPTZero",
    testSample: "GPTZero Test Sample",
    description: "Bypass GPTZero",
  },
  {
    label: "Originality.ai",
    value: "originality",
    imgSrc:
      "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/originality-banner.jpg",
    imgAlt: "Originality.ai",
    testSample: "Originality.ai Test Sample",
    description: "Bypass Originality.ai",
  },
  {
    label: "ZeroGPT",
    value: "zerogpt",
    imgSrc:
      "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/zerogpt-banner.jpg",
    imgAlt: "ZeroGPT",
    testSample: "ZeroGPT Test Sample",
    description: "Bypass ZeroGPT",
  },
  {
    label: "Turnitin",
    value: "turnitin",
    imgSrc:
      "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/turnitin-banner.jpg",
    imgAlt: "Turnitin",
    testSample: "Turnitin Test Sample",
    description: "Bypass Turnitin",
  },
  {
    label: "Winston AI",
    value: "winston",
    imgSrc:
      "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/winston-banner.jpg",
    imgAlt: "Winston AI",
    testSample: "Winston AI Test Sample",
    description: "Bypass Winston AI",
  },
  {
    label: "Content at Scale",
    value: "contentatscale",
    imgSrc:
      "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/content-at-scale-banner.jpg",
    imgAlt: "Content at Scale",
    testSample: "Content at Scale Test Sample",
    description: "Bypass Content at Scale",
  },
  {
    label: "Copyleaks",
    value: "copyleaks",
    imgSrc:
      "https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/index/copyleaks-banner.jpg",
    imgAlt: "Copyleaks",
    testSample: "Copyleaks Test Sample",
    description: "Bypass Copyleaks",
  },
];

export function HomeCarousel() {
  const [activeTab, setActiveTab] = useState(detectors[0].value);

  return (
    <div className="relative bg-[#00014b]">
      <div className="relative z-[1] mx-auto lg:pb-[120px] lg:pt-[160px] w-full max-w-[1232px] text-center py-12">
        <div className="px-4">
          <h2 className="lg:text-4xl font-extrabold md:text-xl text-2xl text-white">
            Beat All AI Detectors Effortlessly
          </h2>
          <p className="mx-auto mt-3 max-w-[860px] text-center text-[#ACAEC6] ">
            Wondering how well BypassAI can make AI generated text undetectable?
            Our anti AI detector tool can help you get 99%+ human scores on
            advanced AI detectors, including:
          </p>
        </div>
        <div className="mt-9 flex  justify-center gap-5 text-[#ACAEC6] sm:gap-3 md:mt-6 lg:gap-6">
          <Tabs value={activeTab}>
            <TabsHeader
              className="rounded-none border-b flex-wrap justify-center gap-2 pb-4  flex border-blue-gray-50 bg-transparent"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2  border-gray-900 shadow-none rounded-none",
              }}>
              {detectors.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={
                    activeTab === value
                      ? "text-blue-400 w-fit"
                      : "text-white w-fit"
                  }>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {detectors.map(
                ({ value, imgSrc, imgAlt, testSample, description }) => (
                  <TabPanel key={value} value={value}>
                    <div className="mx-auto w-full gap-2 flex flex-col lg:flex-row relative max-w-[1140px] overflow-hidden rounded-3xl bg-[#EEEDFD] px-6 lg:py-12  py-6">
                      <img
                        alt={imgAlt}
                        loading="lazy"
                        width="832"
                        height="454"
                        decoding="async"
                        data-nimg="1"
                        className="overflow-hidden lg:w-5/6 rounded-xl lg:rounded-none"
                        src={imgSrc}
                        style={{ color: "transparent" }}
                      />
                      <div className="lg:absolute bottom-4 bg-[#FFD600] text-black lg:w-fit w-full px-3 py-1.5 right-[100px]">
                        <p className="text-sm  ">
                          {testSample} <br className="hidden lg:block" />
                          <span className="font-bold">from GrubbyAI</span>
                        </p>
                      </div>
                      <div className="lg:w-1/6  overflow-hidden lg:flex items-center gap-2">
                        <span className="text-blue-600 break-before-all text-center justify-center w-full group block pt-3 lg:text-lg font-semibold  lg:items-center text-sm">
                          {description}
                        </span>
                      </div>
                    </div>
                  </TabPanel>
                )
              )}
            </TabsBody>
          </Tabs>
        </div>
        <button className="bg-blue-600 mx-auto lg:mt-9 flex lg:h-14 w-fit min-w-[180px] items-center justify-center rounded px-6 text-xl font-bold text-white hover:bg-blue-400 mt-4 h-12 ">
          <Link href="/pricing">Upgrade now</Link>
        </button>
      </div>
      <img
        alt="Your Ultimate Solution to Bypass AI Detection"
        loading="lazy"
        decoding="async"
        data-nimg="fill"
        className="bottom-0 left-0 right-0 top-0"
        src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/banner.jpg"
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          inset: "0px",
          objectFit: "cover",
          color: "transparent",
        }}
      />
    </div>
  );
}

export default HomeCarousel;
