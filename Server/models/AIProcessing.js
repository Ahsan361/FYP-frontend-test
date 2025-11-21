import mongoose from "mongoose";

const aiProcessingSchema = new mongoose.Schema(
  {
    artifact_id: { type: mongoose.Schema.Types.ObjectId, ref: "Artifact", required: true },
    media_id: { type: mongoose.Schema.Types.ObjectId, ref: "ArtifactMedia", required: true },
    processing_type: { type: String, enum: ["image_recognition", "restoration", "classification"], required: true },
    status: { type: String, enum: ["pending", "processing", "completed", "failed"], default: "pending" },
    input_data: { type: Object }, // JSON
    output_data: { type: Object }, // JSON
    confidence_score: { type: Number, min: 0, max: 1 },
    processing_time_seconds: { type: Number },
    ai_model_version: { type: String, maxlength: 50 },
    completed_at: { type: Date }
  },
  { timestamps: { createdAt: "created_at" } }
);

const AIProcessing = mongoose.model("AIProcessing", aiProcessingSchema);
export default AIProcessing;
