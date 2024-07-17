import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    const products = await stripe.products.list({
      limit: 100,
    });

    const prices = await stripe.prices.list({
      limit: 100,
    });

    let plans = products.data.map((product) => {
      const productPrices = prices.data.filter(
        (price) => price.product === product.id
      );
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        words: product.metadata?.wordsPerMonth || 0,

        prices: productPrices.map((price) => ({
          id: price.id,
          frequency: price.recurring?.interval,
          currency: price.currency,
          unit_amount: price.unit_amount,
        })),
        order: 0,
      };
    });

    // Assign order based on plan name
    plans = plans.map((plan) => {
      switch (plan.name) {
        case "Basic":
          plan.order = 1;
          break;
        case "Unlimited":
          plan.order = 2;
          break;
        case "Pro":
          plan.order = 3;
          break;
        default:
          plan.order = 4; // Any other plan gets a default order that puts it after the specified ones
      }
      return plan;
    });

    plans.sort((a, b) => a.order - b.order);

    return NextResponse.json({ plans });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
