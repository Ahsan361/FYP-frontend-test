import mongoose from "mongoose";

const exhibitionRegistrationSchema = new mongoose.Schema(
  {
    exhibition_id: { type: mongoose.Schema.Types.ObjectId, ref: "Exhibition", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    registration_status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    registration_date: { type: Date, default: Date.now },
    payment_status: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
    special_requirements: { type: String },
    confirmation_code: { type: String, maxlength: 20 }
  },
  { timestamps: true }
);

const ExhibitionRegistration = mongoose.model("ExhibitionRegistration", exhibitionRegistrationSchema);
export default ExhibitionRegistration;
