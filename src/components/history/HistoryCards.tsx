"use client";
import { globalStateAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const HistoryCards = (props: Props) => {
  const [state, setState] = useAtom(globalStateAtom);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(`/api/getHistory`, {
        method: "POST",
        next: { revalidate: 60 },
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
    fetchHistory();
  }, []);

  return history.length > 0 ? (
    <div className="shadow-card w-full rounded-lg text-f-text group cursor-pointer bg-white px-8 py-6 text-base md:p-4">
      <Link
        className="group-hover:text-primary text-f-text block"
        href="/?id=8e2b089e-31cf-4aa7-86bb-c211f1ee90c8">
        <p className="line-clamp-2">
          You&apos;re right, getServerSideProps is not available in the new app
          directory introduced in Next.js 13 and carried forward to Next.js 14.
          Instead, you can use server components or fetch data directly in the
          component. Here&apos;s how you can adapt your approach to work with
          the new app directory structure: Fetching Data in the Server Component
          You can directly fetch data in your server component using the fetch
          API. Example Let&apos;s start by creating the server component that
          fetches the plans data and passes it to the client component.
          /app/pricing/page.tsx
        </p>
      </Link>
      <div className="text-display-tertiary mt-3 flex items-center justify-between">
        <div className="flex items-center gap-x-6 md:text-sm">
          <span>2024-07-17 12:57</span>
          <span>101 words</span>
        </div>
        <div className="hover:text-primary hidden h-6 w-6 items-center rounded p-[2px] hover:bg-[rgba(255,255,255,0.1)] group-hover:flex md:flex md:h-5 md:w-5">
          <span className="i-com--trash-solid h-full w-full"></span>
        </div>
      </div>
    </div>
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
