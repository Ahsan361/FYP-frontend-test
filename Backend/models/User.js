import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 100 },
    password_hash: { type: String, required: true },
    first_name: { type: String, maxlength: 50 },
    last_name: { type: String, maxlength: 50 },
    phone_number: { type: String, maxlength: 20 },
    profile_picture_url: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user", required: true },
    is_active: { type: Boolean, default: true },
    email_verified: { type: Boolean, default: false },
    last_login: { type: Date },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password_hash")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password_hash = await bcrypt.hash(this.password_hash, salt);
  next();
});

// Password match check
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password_hash);
};

const User = mongoose.model("User", userSchema);
export default User;
