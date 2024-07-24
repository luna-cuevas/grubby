import { useSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  const supabase = useSupabase();

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("priceId, subscription_id, stripe_customer_id")
      .eq("id", id);

    if (error) {
      console.error("Error fetching words:", error.message);
      return;
    }

    return NextResponse.json({
      priceId: data[0].priceId,
      subscription_id: data[0].subscription_id,
      stripe_customer_id: data[0].stripe_customer_id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
