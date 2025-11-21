import mongoose from "mongoose";

const exhibitionArtifactSchema = new mongoose.Schema(
  {
    exhibition_id: { type: mongoose.Schema.Types.ObjectId, ref: "Exhibition", required: true },
    artifact_id: { type: mongoose.Schema.Types.ObjectId, ref: "Artifact", required: true },
    display_order: { type: Number, default: 0 },
    special_notes: { type: String },
    added_at: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const ExhibitionArtifact = mongoose.model("ExhibitionArtifact", exhibitionArtifactSchema);
export default ExhibitionArtifact;
