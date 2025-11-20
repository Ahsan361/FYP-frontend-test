import Stripe from "stripe";
import User from "../models/User.js";
import Listing from "../models/Listing.js";
import Order from "../models/Order.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SK);
const client = process.env.CLIENT_URL;

export const createConnectAccount = async (req, res) => {
    try {
        const userId = req.user;
        console.log("Authenticated User ID:", userId);
        const account = await stripe.accounts.create({
            type: "express",
            country: "US",
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true }
            },
        });

        await User.findByIdAndUpdate(userId, { stripeAccountId: account.id });

        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${client}/onboard/refresh`,
            return_url: `${client}/onboard/complete`,
            type: "account_onboarding",
        });

        res.json({ url: accountLink.url, accountId: account.id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server Error" });
    }
}

export const createCheckoutSession = async (req, res) => {
    try {
        const buyerId = req.user;
        const { listingId, quantity = 1 } = req.body;

        // Get buyer information
        const buyer = await User.findById(buyerId);
        if (!buyer) {
            console.log("Buyer not found");
            return res.status(404).json({ error: "Buyer not found" });
        }

        //Block Checkout if Stripe not verified
        if (!buyer.isStripeVerified || !buyer.stripeAccountId) {
            return res.status(403).json({
                action: "STRIPE_ONBOARDING_REQUIRED",
                message: "Please complete Stripe onboarding to purchase.",
            });
        }

        //Block Checkout if Wallet not linked
        if (!buyer.isWalletLinked) {
            return res.status(403).json({
                action: "WALLET_LINK_REQUIRED",
                message: "Please link your blockchain wallet before purchasing.",
            });
        }

        // FIXED: Populate the seller field
        const listing = await Listing.findById(listingId).populate("seller");
        
        if (!listing) {
            console.log("Listing not found!");
            return res.status(404).json({ error: "Listing not found" });
        }

        // Check if seller exists
        if (!listing.seller) {
            console.log("Seller not found for this listing");
            return res.status(400).json({ error: "Seller not found for this listing" });
        }

        const seller = listing.seller;

        // Check if seller has Stripe account
        if (!seller.stripeAccountId) {
            console.log("Seller has not connected their Stripe account yet. Please contact the seller.");
            return res.status(400).json({ 
                error: "Seller has not connected their Stripe account yet. Please contact the seller."     
            });
        }
        console.log("--------------HERE-----------------");
        const totalPrice = listing.price * quantity;

        

        // Create order
        const order = await Order.create({
            buyer: buyerId,
            seller: listing.seller._id,
            listing: listingId,
            quantity,
            totalPrice,
            status: "pending",
            tokenId: listing.tokenId,
            contractAddress: listing.contractAddress,
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "pkr",
                        product_data: { 
                            name: listing.title, 
                            description: listing.description 
                        },
                        unit_amount: Math.round(listing.price*100), //confirm from ahsan(50 cents issue)
                    },
                    quantity,
                },
            ],

            payment_intent_data: {
                transfer_data: {
                    destination: seller.stripeAccountId,
                },
                metadata: {
                    orderId: order._id.toString(),
                    listingId: listing._id.toString(),
                    tokenId: listing.tokenId,
                    buyerWallet: buyer.walletAddress || "",
                },
            },

            success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
        });

        order.stripeSessionId = session.id;
        await order.save();

        res.json({ url: session.url, id: session.id });
    } catch (e) {
        console.error("Error in createCheckoutSession:", e);
        res.status(500).json({ 
            message: "Failed to create checkout session", 
            error: e.message 
        });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.stripeAccountId) {
            await stripe.accounts.del(user.stripeAccountId);
        }

        res.json({ message: "Stripe account deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error", error: e.message });
    }
}