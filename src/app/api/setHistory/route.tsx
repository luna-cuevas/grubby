import { NextResponse } from "next/server";
import { useSupabaseWithServiceRole } from "@/lib/supabase";

export async function POST(request: Request) {
  const { result, userId, message, words, wordMax } = await request.json();
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
      .select("*");

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

      const { error: wordCountError, data: wordCountData } = await supabase
        .from("profiles")
        .select("wordCount")
        .eq("id", userId)
        .single();

      if (wordCountError) {
        return NextResponse.json(
          { error: wordCountError.message },
          { status: 500 }
        );
      }

      if (wordCountData.wordCount > wordMax) {
        return NextResponse.json(
          {
            error: "You have exceeded your word limit!",
          },
          { status: 402 }
        );
      }

      return NextResponse.json({ data });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
