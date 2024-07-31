"use client";
import {
  CheckBadgeIcon,
  FaceFrownIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar";
import { useAtom } from "jotai";
import { globalStateAtom } from "@/context/atoms";
import { Spinner } from "@material-tailwind/react";

type Props = {
  detectionResults: {
    name: string;
    imgSrc: string;
    statusClass: string;
    statusColor: string;
  }[];
};

const DetectionSection = (props: Props) => {
  const { detectionResults } = props;
  const [state, setState] = useAtom(globalStateAtom);
  const [resultPresent, setResultPresent] = useState(false);

  useEffect(() => {
    if (state.openAIFetch.result.text !== "") {
      setResultPresent(true);
    } else {
      setResultPresent(false);
    }
  }, [state.openAIFetch]);
  return (
    <div
      className={`
      ${!resultPresent ? "hidden" : "block"}
    bg-[#EEEDFD] mb-12 pb-4 `}
      id="detectionResultView">
      <ProgressBar />

      {state.openAIFetch.isLoading ? (
        <div className="flex items-center justify-center h-[300px]">
          <Spinner className="h-12 w-12" color="blue" />
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center px-4 pt-[30px] text-center">
            <CheckBadgeIcon className="h-8 w-8 text-[#3FB05D]" />
            <div className="mt-3 font-bold text-[#3FB05D]">
              The output content seems to be human-written.
            </div>
          </div>
          <div className="mx-auto mt-5 max-w-[800px] px-4">
            <div className="flex justify-center">
              <div className="grid w-full grid-cols-4 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {detectionResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center text-black justify-between rounded border border-[#DBD9FB] lg:px-[10px] py-1 px-1">
                    <div className="flex items-center gap-x-[6px]">
                      <div className="h-[18px] w-[18px]">
                        <div className="relative h-[18px] w-[18px]">
                          <img
                            alt={`${result.name} logo`}
                            loading="lazy"
                            decoding="async"
                            src={result.imgSrc}
                            className="absolute inset-0 h-full w-full"
                          />
                        </div>
                      </div>
                      <div className="text-sm font-semibold ">
                        <span>{result.name}</span>
                      </div>
                    </div>
                    <div className="h-5 w-5">
                      <span
                        className={`${result.statusClass} h-5 w-5`}
                        style={{ color: result.statusColor }}>
                        <FaceSmileIcon />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex text-black flex-wrap items-center justify-center gap-x-6 gap-y-3 ">
              <div className="flex items-center gap-x-1">
                <span className=" text-[#3FB05D] h-5 w-5">
                  <FaceSmileIcon />
                </span>
                <span className="text-sm">Human-written</span>
              </div>
              <div className="flex items-center gap-x-1">
                <span className=" text-[#D41800] h-5 w-5">
                  <FaceFrownIcon />
                </span>
                <span className="text-sm">AI-generated</span>
              </div>
              <div className="flex items-center gap-x-1">
                <span className=" text-[#FF8A00] h-5 w-5">
                  <FaceFrownIcon />
                </span>
                <span className="text-sm">50% Human-written</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetectionSection;
