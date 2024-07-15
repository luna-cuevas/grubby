import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function GET() {
  try {
    const products = await stripe.products.list({
      limit: 100,
    });

    const prices = await stripe.prices.list({
      limit: 100,
    });

    const plans = products.data.map((product) => {
      const productPrices = prices.data.filter(
        (price) => price.product === product.id
      );
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        prices: productPrices.map((price) => ({
          id: price.id,
          frequency: price.recurring?.interval,
          currency: price.currency,
          unit_amount: price.unit_amount,
        })),
      };
    });

    return NextResponse.json({ plans });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
