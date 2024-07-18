"use client";
import { globalStateAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

type Props = {};

const HistoryCards = (props: Props) => {
  const [state, setState] = useAtom(globalStateAtom);
  const [history, setHistory] = useState([]);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchHistory = async () => {
    const response = await fetch(`/api/getHistory`, {
      method: "POST",
      next: { revalidate: 1 },
      body: JSON.stringify({
        userId: state.user.id,
      }),
    });

    if (!response.ok) {
      console.error("Error fetching history:", response.statusText);
    }

    const data = await response.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const deleteMessage = async (id: string) => {
    const response = await fetch(`/api/deleteHistoryMessage`, {
      method: "POST",
      body: JSON.stringify({
        userId: state.user.id,
        messageId: id,
      }),
    });

    if (!response.ok) {
      console.error("Error deleting message:", response.statusText);
    }

    fetchHistory();
  };

  return history.length > 0 ? (
    history.map((item: any, index: number) => (
      <div
        key={index}
        className="shadow-card w-full rounded-lg text-f-text group cursor-pointer bg-white px-8 py-6 text-base md:p-4">
        <Link
          className="group-hover:text-blue-400  block"
          href={`${baseURL}?id=${item.id}`}>
          <p
            className="line-clamp-2"
            dangerouslySetInnerHTML={{ __html: item.response }}></p>
        </Link>
        <div className="text-gray-600 mt-3 flex items-center justify-between">
          <div className="flex items-center gap-x-6 md:text-sm">
            {new Date(item.created_at).toLocaleString("en-US", {
              timeZone: "UTC",
            })}
            <span>{item.words}</span>
          </div>
          <button
            type="button"
            onClick={() => deleteMessage(item.id)}
            className="hover:text-blue-600 text-gray-600 lg:hidden h-6 w-6 items-center rounded  group-hover:block  lg:h-5 lg:w-5">
            <TrashIcon />
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className=" w-[80%] max-w-[1000px] mx-auto rounded-lg bg-white px-8 py-12 text-center">
      <Image
        alt="empty icon"
        loading="lazy"
        width="64"
        height="52"
        decoding="async"
        data-nimg="1"
        className="mx-auto -translate-x-1"
        src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/ai-edit.png"
      />
      <p className="text-display-tertiary mt-6 text-lg">No History</p>
    </div>
  );
};

export default HistoryCards;
