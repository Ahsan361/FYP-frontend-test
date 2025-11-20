import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }, // URL or file path

    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Blockchain Metadata
    tokenId: { type: String, required: true }, // NFT tokenId
    contractAddress: { type: String, required: true }, // Deployed NFT contract address

    // Listing State
    status: {
      type: String,
      enum: ["active", "sold", "cancelled"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Listing", listingSchema);
