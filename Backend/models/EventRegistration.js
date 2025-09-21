import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  cnic: { type: String, required: true, match: /^\d{5}-\d{7}-\d{1}$/ }, // Pakistani CNIC format
  age: { type: Number, required: true, min: 1, max: 120 }
}, { _id: false });

const eventRegistrationSchema = new mongoose.Schema(
  {
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    registration_status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    registration_date: { type: Date, default: Date.now },
    payment_status: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
    special_requirements: { type: String },
    confirmation_code: { type: String, maxlength: 20 },

    // New fields for multi-spot booking
    spots_requested: { type: Number, required: true, min: 1, max: 10, default: 1 },
    attendees: [attendeeSchema], // Array of attendee details
    total_amount: { type: Number, default: 0 } // spots_requested * event.entry_fee
  },
  { timestamps: true }
);

// Validation to ensure attendees array length matches spots_requested
eventRegistrationSchema.pre('save', function(next) {
  if (this.attendees.length !== this.spots_requested) {
    next(new Error(`Number of attendees (${this.attendees.length}) must match spots requested (${this.spots_requested})`));
  } else {
    next();
  }
});

const EventRegistration = mongoose.model("EventRegistration", eventRegistrationSchema);
export default EventRegistration;
