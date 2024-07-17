"use client";
import { useSupabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

type Props = {};

interface User {
  id: string;
  email: string;
}

const Page = async (props: Props) => {
  const supabase = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } =
      supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleAuthChange = async (event: any, session: any) => {
    console.log("event", event);

    if (
      (event === "SIGNED_IN" ||
        event === "INITIAL_SESSION" ||
        event === "USER_UPDATED") &&
      session
    ) {
      const { data, error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: session.user.id,
          name: session.user.user_metadata.full_name,
          email: session.user.email,
          subscription_plan: "free",
          wordCount: 0,
          wordsMax: 100,
        });

      if (insertError) {
        console.error("Error creating profile:", insertError.message);
        toast.error(insertError.message);
        router.push("/pricing");
      } else {
        console.log("Profile created successfully:", data);
        router.push("/");
      }
    }
  };
};

export default Page;
