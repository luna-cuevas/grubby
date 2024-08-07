import { useSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  const supabase = useSupabase();

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("wordCount, wordsMax, inputMax, interval")
      .eq("id", id);

    if (error) {
      console.error("Error fetching words:", error.message);
      return;
    }

    const subInterval = data[0].interval;

    return NextResponse.json({
      wordsMax:
        subInterval === "year" ? data[0].wordsMax / 12 : data[0].wordsMax,
      wordCount: data[0].wordCount,
      inputMax: data[0].inputMax,
      interval: data[0].interval,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
