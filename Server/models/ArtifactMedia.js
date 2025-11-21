import mongoose from "mongoose";

const artifactMediaSchema = new mongoose.Schema(
  {
    artifact_id: { type: mongoose.Schema.Types.ObjectId, ref: "Artifact", required: true },
    media_type: { type: String, enum: ["image", "video", "document"], required: true },
    file_url: { type: String, required: true },
    file_name: { type: String, maxlength: 255 },
    file_size: { type: Number },
    mime_type: { type: String, maxlength: 100 },
    is_primary: { type: Boolean, default: false },
    caption: { type: String },
    alt_text: { type: String, maxlength: 255 },
    resolution_width: { type: Number },
    resolution_height: { type: Number },
    uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const ArtifactMedia = mongoose.model("ArtifactMedia", artifactMediaSchema);
export default ArtifactMedia;
