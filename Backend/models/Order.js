import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },

    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, required: true },

    // Stripe Payment Info
    paymentIntentId: { type: String },     // Stripe intent
    stripeSessionId: { type: String },     // Checkout session
    stripePaymentStatus: { type: String }, // succeeded / failed / pending

    // Blockchain Metadata
    tokenId: { type: String },            // NFT tokenId
    contractAddress: { type: String },    // NFT contract address
    txHash: { type: String },             // Blockchain transaction hash

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "failed"],
      default: "pending",
    },

    completedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
