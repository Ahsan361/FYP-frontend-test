import mongoose from "mongoose";

const visitBookingSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exhibition_id: { type: mongoose.Schema.Types.ObjectId, ref: "Exhibition", required: true },
    visit_type: { type: String, enum: ["individual", "group", "school", "vip"], default: "individual" },
    visit_date: { type: Date, required: true },
    visit_time_slot: { type: String, required: true }, // e.g. "10:00 AM - 12:00 PM"
    number_of_visitors: { type: Number, default: 1 },
    total_amount: { type: Number, default: 0 },
    payment_status: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
    payment_method: { type: String, maxlength: 50 },
    booking_status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    special_requirements: { type: String },
    confirmation_code: { type: String, maxlength: 20 }
  },
  { timestamps: true }
);

const VisitBooking = mongoose.model("VisitBooking", visitBookingSchema);
export default VisitBooking;
