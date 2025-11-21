import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  cnic: { type: String, required: true, match: /^\d{5}-\d{7}-\d{1}$/ }, // Pakistani CNIC format
  age: { type: Number, required: true, min: 1, max: 120 }
}, { _id: false });

const exhibitionRegistrationSchema = new mongoose.Schema(
  {
    exhibition_id: { type: mongoose.Schema.Types.ObjectId, ref: "Exhibition", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    registration_status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    registration_date: { type: Date, default: Date.now },
    payment_status: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
    special_requirements: { type: String },
    confirmation_code: { type: String, maxlength: 20 },
    
    // New fields for multi-spot booking
    spots_requested: { type: Number, required: true, min: 1, max: 10, default: 1 },
    attendees: [attendeeSchema], // Array of attendee details
    total_amount: { type: Number, default: 0 } // spots_requested * exhibition.entry_fee
  },
  { timestamps: true }
);

// Validation to ensure attendees array length matches spots_requested
exhibitionRegistrationSchema.pre('save', function(next) {
  if (this.attendees.length !== this.spots_requested) {
    next(new Error(`Number of attendees (${this.attendees.length}) must match spots requested (${this.spots_requested})`));
  } else {
    next();
  }
});

const ExhibitionRegistration = mongoose.model("ExhibitionRegistration", exhibitionRegistrationSchema);
export default ExhibitionRegistration;