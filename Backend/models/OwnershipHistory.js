import mongoose from "mongoose";

const ownershipHistorySchema = new mongoose.Schema(
  {
    artifact_id: { type: mongoose.Schema.Types.ObjectId, ref: "Artifact", required: true },
    previous_owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    current_owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    listing_id: { type: mongoose.Schema.Types.ObjectId, ref: "MarketplaceListing" },
    blockchain_record_id: { type: mongoose.Schema.Types.ObjectId, ref: "BlockchainRecord" },
    transfer_type: { type: String, enum: ["sale", "gift", "auction", "transfer"], required: true },
    transfer_price: { type: Number },
    transfer_date: { type: Date, default: Date.now },
    certificate_url: { type: String },
    notes: { type: String }
  },
  { timestamps: true }
);

const OwnershipHistory = mongoose.model("OwnershipHistory", ownershipHistorySchema);
export default OwnershipHistory;
