import { useSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  const supabase = useSupabase();

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("wordCount, wordsMax, inputMax")
      .eq("id", id);

    if (error) {
      console.error("Error fetching words:", error.message);
      return;
    }

    return NextResponse.json({
      wordsMax: data[0].wordsMax,
      wordCount: data[0].wordCount,
      inputMax: data[0].inputMax,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
