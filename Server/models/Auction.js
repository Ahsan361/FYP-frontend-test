import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    startPrice: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    endTime: { type: Date, required: true },
    bids: [
      {
        bidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: Number,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["open", "closed", "settled"], default: "open" },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("Auction", auctionSchema);
