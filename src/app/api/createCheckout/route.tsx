import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { useSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const supabase = useSupabase();
  const origin = request.headers.get("origin");
  const { priceId, successUrl, cancelUrl, userId, type } = await request.json();
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

    if (profile?.subscription_id) {
      const subscription = await stripe.subscriptions.retrieve(
        profile.subscription_id
      );

      const customerId = subscription.customer as string;

      if (type === "update") {
        const session = await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: cancelUrl,
          flow_data: {
            type: "subscription_update",
            after_completion: {
              type: "redirect",
              redirect: {
                return_url: successUrl,
              },
            },
            subscription_update: {
              subscription: subscription.id,
            },
          },
        });
        return NextResponse.json({ url: session.url });
      } else if (type === "cancel") {
        const session = await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: cancelUrl,
          flow_data: {
            type: "subscription_cancel",
            after_completion: {
              type: "redirect",
              redirect: {
                return_url: successUrl,
              },
            },
            subscription_cancel: {
              subscription: subscription.id,
            },
          },
        });
        return NextResponse.json({ url: session.url });
      } else if (type === "payment_method_update") {
        const session = await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: cancelUrl,
          flow_data: {
            type: "payment_method_update",
            after_completion: {
              type: "redirect",
              redirect: {
                return_url: successUrl,
              },
            },
          },
        });
        return NextResponse.json({ url: session.url });
      }
    } else {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        allow_promotion_codes: true,
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
