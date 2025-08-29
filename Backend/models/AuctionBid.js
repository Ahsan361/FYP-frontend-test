import mongoose from "mongoose";

const auctionBidSchema = new mongoose.Schema(
  {
    listing_id: { type: mongoose.Schema.Types.ObjectId, ref: "MarketplaceListing", required: true },
    bidder_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bid_amount: { type: Number, required: true },
    is_winning_bid: { type: Boolean, default: false },
    is_auto_bid: { type: Boolean, default: false },
    max_auto_bid_amount: { type: Number },
    bid_time: { type: Date, default: Date.now },
    ip_address: { type: String, maxlength: 45 }
  },
  { timestamps: true }
);

const AuctionBid = mongoose.model("AuctionBid", auctionBidSchema);
export default AuctionBid;
