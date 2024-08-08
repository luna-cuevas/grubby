import Image from "next/image";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {
  item: any;
  userData: any;
};

const HistoryCards = async (props: Props) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const item = props.item;
  const userData = props.userData;

  return (
    <div className="shadow-card w-full rounded-lg text-f-text group cursor-pointer bg-white px-8 py-6 text-base md:p-4">
      <h2 className="text-lg font-bold text-blue-600">AI Response:</h2>
      <Link
        className="group-hover:text-blue-400 block"
        href={`${baseURL}?id=${item.id}`}>
        {item.response.slice(0, 225)}...
      </Link>
      <div className="text-gray-600 mt-3 flex items-end justify-between">
        <div className="flex  md:text-sm flex-col">
          <h3 className="text-base font-bold text-blue-600">Prompt:</h3>
          {item.message.slice(0, 100)}
        </div>
        {new Date(item.created_at).toLocaleString("en-US", {
          timeZone: "UTC",
        })}
        <form method="POST" action="/api/deleteHistoryMessage">
          <input type="hidden" name="userId" value={userData.data.user.id} />
          <input type="hidden" name="messageId" value={item.id} />
          <button
            type="submit"
            className="hover:text-blue-600 text-gray-600 lg:hidden h-6 w-6 items-center rounded group-hover:block lg:h-5 lg:w-5">
            <TrashIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HistoryCards;
