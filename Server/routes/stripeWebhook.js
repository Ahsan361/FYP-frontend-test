import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import { marketContract } from "../blockchain/contracts.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SK);
const endpointSecret = process.env.WEBHOOK_SECRET;
const router = express.Router();


async function handleCheckoutSessionCompleted(session) {
    const orderId = session.metadata.orderId;
    const listingId = session.metadata.listingId;
    const tokenId = session.metadata.tokenId;
    const buyerWallet = session.metadata.buyerWallet;
    const order = await Order.findByIdAndUpdate(orderId, { status: "completed" }, { new: true }).populate("buyer");
    console.log(`Order ${orderId} marked as completed.`);

    try {
        const tx = await marketContract.confirmSale(tokenId, order.buyer.walletAddress);
        await tx.wait();
        console.log(`Ownership of token ${tokenId} transferred to buyer ${order.buyer.walletAddress}`);
        await Listing.findByIdAndUpdate(listingId, { status: "sold" });
    } catch (e){
        console.error("Blockchain transfer failed:", e);
    }

}

router.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
    let event;
    if (endpointSecret) {
        const signature = req.headers["stripe-signature"];

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                endpointSecret
            );
        } catch (e) {
            console.log("Webhook signature verification failed.", e.message);
            return res.sendStatus(400);
        }
    }
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            handleCheckoutSessionCompleted(session);
            break;
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

export default router;