import { stripe } from "@/lib/stripe"; // Assuming you have a stripe instance in lib/stripe
import { createClient } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

interface Product {
  name: string;
}

export async function POST(request: NextRequest) {
  const { id } = await request.json();
  const supabase = createClient();

  // fetch stripe_customer_id from the database

  const customerId = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", id)
    .then(({ data, error }) => {
      if (error) {
        console.error("Error fetching stripe_customer_id:", error.message);
        return null;
      }
      return data[0].stripe_customer_id;
    });

  if (!customerId) {
    return NextResponse.json(
      { error: "Missing required parameter: stripeCustomerId" },
      { status: 400 }
    );
  }

  try {
    // Fetch the customer's subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId as string,
      status: "active",
      limit: 1,
    });

    if (!subscriptions.data.length) {
      return NextResponse.json(
        { error: "No active subscription found for this customer" },
        { status: 404 }
      );
    }

    const subscription = subscriptions.data[0];

    // Fetch the price and product details from Stripe
    const price = await stripe.prices.retrieve(
      subscription.items.data[0].price.id,
      {
        expand: ["product"],
      }
    );
    const product = price.product as Product;
    // @ts-ignore
    const subInterval = price.recurring.interval;

    // Prepare the response data
    const responseData = {
      subscriptionName: product.name || "",
      price: price.unit_amount ? price.unit_amount / 100 : null, // Stripe prices are in cents
      renewalDate: new Date(
        subscription.current_period_end * 1000
      ).toISOString(), // Convert from Unix timestamp
      interval: subInterval,
      startDate: new Date(subscription.start_date * 1000).toISOString(), // Convert from Unix timestamp
    };

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("Error fetching subscription details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
