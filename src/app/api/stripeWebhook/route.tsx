import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabaseServer";

const updateUserProfile = async (
  subscription: Stripe.Subscription,
  supabase: any
) => {
  const customerId = subscription.customer as string;
  const priceId = subscription.items.data[0].price.id;

  // Fetch the price and product details from Stripe
  const price = await stripe.prices.retrieve(priceId, {
    expand: ["product"],
  });
  const product = price.product as Stripe.Product;
  const plan = product.name;
  const wordsMax = product.metadata.wordsPerMonth;
  const inputMax = product.metadata.inputMax;
  // @ts-ignore
  const interval = price.recurring.interval;

  // Find the customer in your database and update the subscription plan and states
  const { data: profiles, error } = await supabase
    .from("profiles")
    .update({
      subscription_plan: plan,
      wordsMax: interval === "year" ? Number(wordsMax) * 12 : wordsMax,
      inputMax,
      priceId: price.id,
      subscription_id: subscription.id,
      stripe_customer_id: customerId,
      // @ts-ignore
      interval: price.recurring.interval,
    })
    .eq("stripe_customer_id", customerId)
    .select("*");

  if (error) {
    console.log("Supabase error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
};

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  let event: Stripe.Event;

  const supabase = createClient();

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
          priceId: "",
          subscription_id: "",
          interval: "",
          stripe_customer_id: "",
        })
        .eq("stripe_customer_id", customerId);

      if (error) {
        console.log("Supabase error:", error.message);
        return NextResponse.json({ error: error.message });
      }

      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription as string,
        {
          expand: ["items.data.price.product"],
        }
      );

      const result = await updateUserProfile(subscription, supabase);
      if (!result.success) {
        return NextResponse.json({ error: result.error });
      }

      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;

      const result = await updateUserProfile(subscription, supabase);
      if (!result.success) {
        return NextResponse.json({ error: result.error });
      }

      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ success: true });
}
