import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabaseServer";

const updateSubscriptionStatus = async (
  profileId: string,
  stripeCustomerId: string | null
) => {
  const supabase = createClient();

  try {
    if (!stripeCustomerId) {
      // User is on the free plan or has no active subscription
      const { error } = await supabase
        .from("profiles")
        .update({
          wordCount: 0,
        })
        .eq("id", profileId);

      if (error) {
        console.log("Supabase error:", error.message);
        return { success: false, error: error.message };
      }
    } else {
      const subscriptions = await stripe.subscriptions.list({
        customer: stripeCustomerId,
        status: "active",
      });

      if (subscriptions.data.length === 0) {
        // No active subscription, reset to free plan defaults
        const { error } = await supabase
          .from("profiles")
          .update({
            subscription_plan: "free",
            wordsMax: 100,
            inputMax: 100,
            wordCount: 0,
            priceId: "",
            subscription_id: "",
            stripe_customer_id: "",
          })
          .eq("id", profileId);

        if (error) {
          console.log("Supabase error:", error.message);
          return { success: false, error: error.message };
        }
      } else {
        // Active subscription, update based on metadata
        const subscription = subscriptions.data[0];
        const priceId = subscription.items.data[0].price.id;
        const price = await stripe.prices.retrieve(priceId, {
          expand: ["product"],
        });
        const product = price.product as Stripe.Product;
        const plan = product.name;
        const wordsMax = product.metadata.wordsPerMonth;
        const inputMax = product.metadata.inputMax;

        const { error } = await supabase
          .from("profiles")
          .update({
            subscription_plan: plan,
            wordsMax,
            inputMax,
            wordCount: 0,
            priceId: price.id,
            subscription_id: subscription.id,
            stripe_customer_id: stripeCustomerId,
          })
          .eq("id", profileId);

        if (error) {
          console.log("Supabase error:", error.message);
          return { success: false, error: error.message };
        }
      }
    }
  } catch (err: any) {
    console.log("Stripe error:", err.message);
    return { success: false, error: err.message };
  }

  return { success: true };
};

const resetMonthlyLimits = async () => {
  const supabase = createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, stripe_customer_id");

  console.log("profiles", profiles);

  if (error) {
    console.log("Supabase error:", error.message);
    return { success: false, error: error.message };
  }

  for (const profile of profiles) {
    await updateSubscriptionStatus(profile.id, profile.stripe_customer_id);
  }

  return { success: true };
};

export default resetMonthlyLimits;
