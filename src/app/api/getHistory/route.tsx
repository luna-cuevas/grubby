import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { useSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const { userId } = await request.json();
  const supabase = useSupabase();

  try {
    const { data, error } = await supabase
      .from("history")
      .select("*")
      .eq("profile_id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
