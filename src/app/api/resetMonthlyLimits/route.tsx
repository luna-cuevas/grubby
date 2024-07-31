import resetMonthlyLimits from "@/utils/resetMonthlyLimits";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  const authHeader = request.headers.get("authorization");
  console.log("authHeader", authHeader);
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }
  try {
    const result = await resetMonthlyLimits();
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
