import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { useSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const supabase = useSupabase();
  const origin = request.headers.get("origin");
  const { priceId, successUrl, cancelUrl, userId } = await request.json();
  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, subscription_id")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError.message);
      return;
    }

    console.log("profile", profile);

    if (profile?.subscription_id) {
      const subscription = await stripe.subscriptions.retrieve(
        profile.subscription_id
      );

      console.log("subscription", subscription);

      const customerId = subscription.customer as string;

      console.log("customerId", customerId);

      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: origin + "/pricing",

        flow_data: {
          type: "subscription_update",
          subscription_update: {
            subscription: profile.subscription_id,
          },
          after_completion: {
            type: "redirect",
            redirect: {
              return_url: origin + "/pricing?updated=true",
            },
          },
        },
      });

      return NextResponse.json({ url: session.url });
    } else {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        subscription_data: {
          metadata: {
            userId: userId,
          },
        },
        customer_email: profile.email,
        success_url: successUrl + "?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: cancelUrl,
      });

      return NextResponse.json({ sessionId: session.id });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
