import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { error, data: userData } =
      await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data, error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: userData.session.user.id,
          name: userData.session.user.user_metadata.full_name,
          email: userData.session.user.email,
          subscription_plan: "free",
          wordCount: 0,
          wordsMax: 100,
          inputMax: 100,
        })
        .select();

      if (insertError && insertError.code === "23505") {
        const errorMessage = "User already registered. Please log in.";
        return NextResponse.redirect(
          `${origin}/login?message=${encodeURIComponent(errorMessage)}`
        );
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
