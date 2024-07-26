import HistoryCards from "@/components/history/HistoryCards";
import { createClient } from "@/lib/supabaseServer";
import Image from "next/image";
import React from "react";

type Props = {};

const supabase = createClient();
const userData = await supabase.auth.getUser();

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const fetchHistory = async () => {
  if (!userData.data.user) {
    return null;
  }

  const response = await fetch(`${baseUrl}/api/getHistory`, {
    method: "POST",
    body: JSON.stringify({
      userId: userData.data.user.id,
    }),
  });

  if (!response.ok) {
    console.error("Error fetching history:", response.statusText);
  }

  const data = await response.json();
  return data;
};

const page = async (props: Props) => {
  const historyData = await fetchHistory();

  return (
    <div className="mx-auto py-12 md:py-6 bg-gray-200 min-h-screen">
      <div className="mb-5 text-center text-6xl font-bold md:text-3xl">
        History
      </div>
      <div className="flex flex-col gap-y-5 px-4 lg:gap-y-3 max-w-[1000px] mx-auto">
        {historyData.length > 0 ? (
          historyData.map((item: any, index: number) => (
            <HistoryCards key={index} item={item} userData={userData} />
          ))
        ) : (
          <div className="w-[80%] max-w-[1000px] mx-auto rounded-lg bg-white px-8 py-12 text-center">
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
        )}
      </div>
    </div>
  );
};

export default page;
