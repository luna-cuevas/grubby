import UpdateSubscription from "@/components/account/UpdateSubscription";
import WordsAvailable from "@/components/account/WordsAvailable";
import { createClient } from "@/lib/supabaseServer";
import React from "react";

type Props = {};

const getWordCount = async (userData: any) => {
  if (!userData.data.user) {
    return null;
  }

  const id = userData.data.user.id;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getWordCount`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching word count: ", error);
  }
};

const fetchSubscription = async (userData: any) => {
  if (!userData.data.user) {
    return null;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSubDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userData.data.user.id,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching subscription: ", error);
  }
};

const page = async () => {
  const supabase = createClient();
  const userData = await supabase.auth.getUser();

  const wordCount = await getWordCount(userData);

  const subscription = await fetchSubscription(userData);

  return (
    <div className="text-f-text mx-auto pt-20 max-w-[800px] pb-12 md:px-4 ">
      <div className="mx-auto mb-5 text-center text-3xl font-semibold">
        Account
      </div>
      <div className="mx-auto max-w-[744px]">
        <UpdateSubscription subscription={subscription} />
        <WordsAvailable wordCount={wordCount} />
      </div>
    </div>
  );
};

export default page;
