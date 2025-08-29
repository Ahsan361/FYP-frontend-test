import mongoose from "mongoose";

const eventRegistrationSchema = new mongoose.Schema(
  {
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    registration_status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    registration_date: { type: Date, default: Date.now },
    payment_status: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
    special_requirements: { type: String },
    confirmation_code: { type: String, maxlength: 20 }
  },
  { timestamps: true }
);

const EventRegistration = mongoose.model("EventRegistration", eventRegistrationSchema);
export default EventRegistration;
