import { NextResponse } from "next/server";
import { useSupabase, useSupabaseWithServiceRole } from "@/lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const messageId = formData.get("messageId");
  const supabase = useSupabaseWithServiceRole();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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

    return NextResponse.redirect(`${baseUrl}/history`);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
