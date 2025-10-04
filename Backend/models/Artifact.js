import mongoose from "mongoose";

const artifactSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 255 },
    description: { type: String },
    category: { type: String, enum: ["painting", "sculpture", "document", "other"], required: true },
    material: { type: String, maxlength: 100 },
    time_period: { type: String, maxlength: 100 },
    geographical_origin: { type: String, maxlength: 100 },
    artistic_style: { type: String, maxlength: 100 },
    condition_status: { type: String, enum: ["excellent", "good", "fair", "poor"], default: "good" },
    dimensions_length: { type: Number },
    dimensions_width: { type: Number },
    dimensions_height: { type: Number },
    weight: { type: Number },
    cultural_significance: { type: String },
    historical_context: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    is_featured: { type: Boolean, default: false },
    view_count: { type: Number, default: 0 },
    contributor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    curator_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    published_at: { type: Date },
    artifactImage: {
      url: { type: String, default: null },
      publicId: { type: String, default: null }
    },
  },
  { timestamps: true }
);

const Artifact = mongoose.model("Artifact", artifactSchema);
export default Artifact;
