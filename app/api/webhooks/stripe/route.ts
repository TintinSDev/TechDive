import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
export const dynamic = "force-dynamic";

// Initialize Stripe (omitting version defaults to your active stripe dashboard settings)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || " ");

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || "",
      );
    } catch (error: any) {
      console.error("Webhook signature verification failed:", error.message);
      return NextResponse.json(
        { error: `Invalid signature: ${error.message}` },
        { status: 400 },
      );
    }

    // Handle the event types securely
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Payment successful for session:", session.id);
        // TODO: Update your database (e.g., prisma.user.update)
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription updated:", subscription.id);
        break;
      }

      case "customer.subscription.deleted": {
        const cancelledSub = event.data.object as Stripe.Subscription;
        console.log("Subscription deleted:", cancelledSub.id);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Invoice paid:", invoice.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
