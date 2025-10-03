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
    profileImage: {
      url: { type: String, default: null },
      publicId: { type: String, default: null }
    },
    // Email verification fields
    verification_otp: { type: String },
    otp_expires_at: { type: Date },
    otp_attempts: { type: Number, default: 0 },
    created_at_unverified: { type: Date },
  },
  { timestamps: true }
);

// Password validation function
userSchema.statics.validatePassword = function(password) {
  const errors = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push("Password must contain at least one special character (@$!%*?&)");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Generate OTP
userSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  this.verification_otp = otp;
  this.otp_expires_at = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes
  this.otp_attempts = 0;
  return otp;
};

// Verify OTP
userSchema.methods.verifyOTP = function(inputOtp) {
  if (!this.verification_otp || !this.otp_expires_at) {
    return { success: false, message: "No OTP found. Please request a new one." };
  }
  
  if (new Date() > this.otp_expires_at) {
    return { success: false, message: "OTP has expired. Please request a new one." };
  }
  
  if (this.otp_attempts >= 5) {
    return { success: false, message: "Too many failed attempts. Please request a new OTP." };
  }
  
  if (this.verification_otp !== inputOtp) {
    this.otp_attempts += 1;
    return { 
      success: false, 
      message: `Invalid OTP. ${5 - this.otp_attempts} attempts remaining.` 
    };
  }
  
  // Success - clear OTP fields and verify email
  this.verification_otp = undefined;
  this.otp_expires_at = undefined;
  this.otp_attempts = 0;
  this.email_verified = true;
  this.created_at_unverified = undefined;
  
  return { success: true, message: "Email verified successfully!" };
};

// Clear expired OTP
userSchema.methods.clearExpiredOTP = function() {
  if (this.otp_expires_at && new Date() > this.otp_expires_at) {
    this.verification_otp = undefined;
    this.otp_expires_at = undefined;
    this.otp_attempts = 0;
  }
};

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

// Index for cleanup job
userSchema.index({ 
  created_at_unverified: 1, 
  email_verified: 1 
}, { 
  expireAfterSeconds: 86400, // 24 hours
  partialFilterExpression: { 
    email_verified: false,
    created_at_unverified: { $exists: true }
  }
});

const User = mongoose.model("User", userSchema);
export default User;