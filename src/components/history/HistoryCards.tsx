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
      <Link
        className="group-hover:text-blue-400 block"
        href={`${baseURL}?id=${item.id}`}>
        {item.response}
      </Link>
      <div className="text-gray-600 mt-3 flex items-center justify-between">
        <div className="flex items-center gap-x-6 md:text-sm">
          {new Date(item.created_at).toLocaleString("en-US", {
            timeZone: "UTC",
          })}
          {item.message.slice(0, 100)}
        </div>
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
