import mongoose from "mongoose";

const blockchainRecordSchema = new mongoose.Schema(
  {
    artifact_id: { type: mongoose.Schema.Types.ObjectId, ref: "Artifact", required: true },
    transaction_hash: { type: String, required: true, unique: true, maxlength: 66 },
    block_number: { type: Number },
    blockchain_network: { type: String, maxlength: 50 },
    transaction_type: { type: String, enum: ["mint", "transfer", "sale", "verify"], required: true },
    from_address: { type: String, maxlength: 42 },
    to_address: { type: String, maxlength: 42 },
    artifact_hash: { type: String, maxlength: 64 },
    metadata_hash: { type: String, maxlength: 64 },
    smart_contract_address: { type: String, maxlength: 42 },
    gas_used: { type: Number },
    transaction_fee: { type: Number },
    is_verified: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: "created_at" } }
);

const BlockchainRecord = mongoose.model("BlockchainRecord", blockchainRecordSchema);
export default BlockchainRecord;
