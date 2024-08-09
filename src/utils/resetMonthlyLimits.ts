import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabaseServer";

const updateSubscriptionStatus = async (
  profileId: string,
  stripeCustomerId: string
) => {
  const supabase = createClient();

  try {
    // Fetch the last reset date and subscription plan interval from the database
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("last_reset_date, subscription_plan")
      .eq("id", profileId)
      .single();

    if (profileError) {
      console.error("Supabase error:", profileError.message);
      return { success: false, error: profileError.message };
    }

    const lastResetDate = new Date(profileData.last_reset_date);
    const currentDate = new Date();

    // Check if the subscription plan is yearly
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: "active",
    });

    if (subscriptions.data.length === 0) {
      // Handle case where there's no active subscription
      return { success: false, error: "No active subscription found" };
    }

    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0].price.id;
    const price = await stripe.prices.retrieve(priceId, {
      expand: ["product"],
    });
    const product = price.product as Stripe.Product;

    // Check if the subscription interval is "year"
    if (subscription.items.data[0].price.recurring?.interval !== "year") {
      return { success: false, message: "Subscription is not yearly." };
    }

    // Check if it's been a month since the last reset
    const oneMonthAgo = new Date(lastResetDate);
    oneMonthAgo.setMonth(lastResetDate.getMonth() + 1);
    console.log("oneMonthAgo", oneMonthAgo);

    if (currentDate < oneMonthAgo) {
      // If it hasn't been a month since the last reset, do not reset
      return { success: true, message: "Reset not needed yet." };
    }

    // Proceed with the subscription status update and reset the word count
    const plan = product.name;
    const wordsMax = product.metadata.wordsPerMonth;
    const inputMax = product.metadata.inputMax;

    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_plan: plan,
        wordsMax,
        inputMax,
        wordCount: 0, // Reset word count since it's a new month
        priceId: price.id,
        subscription_id: subscription.id,
        stripe_customer_id: stripeCustomerId,
        last_reset_date: currentDate.toISOString(), // Update the reset date to now
      })
      .eq("id", profileId);

    if (error) {
      console.log("Supabase error:", error.message);
      return { success: false, error: error.message };
    }
  } catch (err: any) {
    console.log("Stripe error:", err.message);
    return { success: false, error: err.message };
  }

  return { success: true, message: "Monthly limits reset successfully." };
};

const resetMonthlyLimits = async (
  userId: string,
  stripe_customer_id: string
) => {
  const response = await updateSubscriptionStatus(userId, stripe_customer_id);

  return response;
};

export default resetMonthlyLimits;
