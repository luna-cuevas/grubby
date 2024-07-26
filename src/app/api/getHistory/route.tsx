import { NextResponse } from "next/server";
import { useSupabase } from "@/lib/supabase";
import { createClient } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  const { userId, messageId } = await request.json();
  const supabase = createClient();

  try {
    if (messageId) {
      // update the history table with the new result
      const { data, error } = await supabase
        .from("history")
        .select("*")
        .eq("user_id", userId)
        .eq("id", messageId);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data);
    } else {
      // update the history table with the new result
      const { data, error } = await supabase
        .from("history")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching history:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log("history data api", data);
      return NextResponse.json(data);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
