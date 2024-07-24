import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { useSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  let event: Stripe.Event;

  const supabase = useSupabase();

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.log("Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "customer.subscription.deleted":
    case "invoice.payment_failed": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      // Find the customer in your database and update the subscription status
      const { data: profiles, error } = await supabase
        .from("profiles")
        .update({
          subscription_plan: "free",
          wordsMax: 100,
          inputMax: 100,
          priceId: null,
          subscriptionId: null,
        })
        .eq("stripe_customer_id", customerId);

      if (error) {
        console.log("Supabase error:", error.message);
        return NextResponse.json({ error: error.message });
      }

      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const priceId = subscription.items.data[0].price.id;

      // Fetch the price and product details from Stripe
      const price = await stripe.prices.retrieve(priceId, {
        expand: ["product"],
      });
      const product = price.product as Stripe.Product;
      const plan = product.name;
      const wordsLeft = parseInt(product.metadata.wordsPerMonth, 10);

      // Find the customer in your database and update the subscription plan and wordsLeft
      const { data: profiles, error } = await supabase
        .from("profiles")
        .update({
          subscription_plan: plan,
          wordsMax: wordsLeft,
          priceId,
          subscription_id: subscription.id,
          stripe_customer_id: customerId,
        })
        .eq("stripe_customer_id", customerId);

      if (error) {
        console.log("Supabase error:", error.message);
        return NextResponse.json({ error: error.message });
      }

      console.log("Subscription updated successfully:", profiles);

      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ success: true });
}
