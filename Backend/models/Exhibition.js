import mongoose from "mongoose";

const exhibitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 255 },
    description: { type: String },
    curator_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, enum: ["art", "history", "science", "other"], default: "art" },
    status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    location: { type: String, maxlength: 255 },
    max_capacity: { type: Number },
    current_bookings: { type: Number, default: 0 },
    entry_fee: { type: Number, default: 0 },
    age_restriction: { type: String },
    banner_image_url: { type: String },
    is_featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Exhibition = mongoose.model("Exhibition", exhibitionSchema);
export default Exhibition;
