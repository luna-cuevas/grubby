import resetMonthlyLimits from "@/utils/resetMonthlyLimits";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, stripe_customer_id } = await request.json();
  try {
    const result = await resetMonthlyLimits(userId, stripe_customer_id);
    if (!result.success) {
      return NextResponse.json({ error: result }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: result.message });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
