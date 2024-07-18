import { NextResponse } from "next/server";
import { useSupabase, useSupabaseWithServiceRole } from "@/lib/supabase";

export async function POST(request: Request) {
  const { userId, messageId } = await request.json();
  const supabase = useSupabaseWithServiceRole();

  console.log("userId", userId);
  console.log("messageId", messageId);
  try {
    const { data, error } = await supabase
      .from("history")
      .delete()
      .eq("user_id", userId)
      .eq("id", messageId)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
