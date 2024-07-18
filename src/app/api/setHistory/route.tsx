import { NextResponse } from "next/server";
import { useSupabaseWithServiceRole } from "@/lib/supabase";

export async function POST(request: Request) {
  const { result, userId, message, words } = await request.json();
  const supabase = useSupabaseWithServiceRole();

  try {
    const { data, error } = await supabase
      .from("history")
      .insert({
        user_id: userId,
        message: message,
        response: result,
        words: words,
      })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      const { error: rpcError, data: rcpData } = await supabase.rpc(
        "increment_word_count",
        {
          user_id: userId,
          increment: words,
        }
      );

      if (rpcError) {
        return NextResponse.json({ error: rpcError.message }, { status: 500 });
      }

      return NextResponse.json({ data });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
