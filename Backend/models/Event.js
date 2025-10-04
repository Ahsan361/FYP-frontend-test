import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 255 },
    description: { type: String },
    organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event_type: { type: String, enum: ["conference", "workshop", "seminar", "exhibition", "other"], default: "other" },
    status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
    start_datetime: { type: Date, required: true },
    end_datetime: { type: Date, required: true },
    location: { type: String, maxlength: 255 },
    max_attendees: { type: Number },
    current_registrations: { type: Number, default: 0 },
    registration_fee: { type: Number, default: 0 },
    is_free: { type: Boolean, default: false },
    requires_registration: { type: Boolean, default: true },
    target_audience: { type: String, enum: ["students", "researchers", "public", "professionals", "all"], default: "all" },
    eventImage: {
      url: { type: String, default: null },
      publicId: { type: String, default: null }
    },
    
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
