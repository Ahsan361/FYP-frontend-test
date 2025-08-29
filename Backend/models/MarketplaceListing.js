import mongoose from "mongoose";

const marketplaceListingSchema = new mongoose.Schema(
  {
    artifact_id: { type: mongoose.Schema.Types.ObjectId, ref: "Artifact", required: true },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    listing_type: { type: String, enum: ["auction", "fixed", "reserve"], required: true },
    title: { type: String, required: true, maxlength: 255 },
    description: { type: String },
    starting_price: { type: Number },
    current_price: { type: Number },
    reserve_price: { type: Number },
    buy_now_price: { type: Number },
    currency: { type: String, default: "USD" },
    status: { type: String, enum: ["active", "sold", "cancelled"], default: "active" },
    auction_start_time: { type: Date },
    auction_end_time: { type: Date },
    auto_extend_minutes: { type: Number },
    shipping_cost: { type: Number },
    is_featured: { type: Boolean, default: false },
    view_count: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const MarketplaceListing = mongoose.model("MarketplaceListing", marketplaceListingSchema);
export default MarketplaceListing;
