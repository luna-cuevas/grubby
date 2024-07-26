"use client";
import { globalStateAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

type Props = {};

const WordsAvailable = (props: Props) => {
  const [state, setState] = useAtom(globalStateAtom);
  const [wordCount, setWordCount] = useState(0);
  const [wordsMax, setWordsMax] = useState(0);

  useEffect(() => {
    const getWordCount = async () => {
      try {
        const response = await fetch("/api/getWordCount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: state.user?.id,
          }),
        });
        const data = await response.json();
        setWordCount(Number(data.wordCount));
        setWordsMax(Number(data.wordsMax));
      } catch (error) {
        console.error("Error fetching word count: ", error);
      }
    };
    getWordCount();
  }, []);

  return (
    <div className=" overflow-hidden rounded-[8px] border bg-white p-8 md:px-6 mt-5">
      <div className="mb-2 font-semibold">Your Words</div>
      <div className="text-f-text-secondary mb-5 text-sm">
        The number of words available for use.
      </div>
      <div className="text-f-text capitalize text-sm font-semibold">
        <span>{wordsMax - wordCount} Words Remaining.</span>
      </div>
    </div>
  );
};

export default WordsAvailable;
