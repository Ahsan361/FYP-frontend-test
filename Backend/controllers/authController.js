import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import emailService from "../services/emailService.js";

// Register
export const registerUser = async (req, res) => {
  const { username, email, password_hash } = req.body;
  
  try {
    // Validate password
    const passwordValidation = User.validatePassword(password_hash);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        message: "Password does not meet requirements",
        errors: passwordValidation.errors
      });
    }

    // Check for existing users (verified or unverified)
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }]
    });
    
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // Create new user
    const noAdminExists = (await User.countDocuments({ role: "admin" })) === 0;
    const envAdminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
    const shouldBeAdmin = noAdminExists || (envAdminEmail && envAdminEmail === email.toLowerCase());

    const user = new User({
      username,
      email,
      password_hash,
      role: shouldBeAdmin ? "admin" : "user",
      email_verified: shouldBeAdmin, // Admin accounts are auto-verified
      created_at_unverified: shouldBeAdmin ? undefined : new Date()
    });

    // Generate and set OTP for non-admin users
    if (user.role !== "admin") {
      const otp = user.generateOTP();
      await user.save();

      // Send verification email
      try {
        await emailService.sendVerificationEmail(email, otp, username);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }

      return res.status(201).json({
        message: "Registration successful! Please check your email for verification code.",
        requiresVerification: true,
        userId: user._id,
        email: user.email
      });
    } else {
      // Admin user - auto verified
      await user.save();
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        requiresVerification: false
      });
    }

  } catch (error) {
    console.error("❌ Error in registerUser:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Verify Email
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.email_verified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const verificationResult = user.verifyOTP(otp);
    
    if (!verificationResult.success) {
      await user.save(); // Save updated attempt count
      return res.status(400).json({ message: verificationResult.message });
    }

    await user.save();

    // Send welcome email
    try {
      await emailService.sendWelcomeEmail(user.email, user.username);
    } catch (emailError) {
      console.error("Welcome email failed:", emailError);
    }

    return res.status(200).json({
      message: "Email verified successfully!",
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error("❌ Error in verifyEmail:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Resend OTP
export const resendOTP = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.email_verified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Clear any expired OTP
    user.clearExpiredOTP();

    // Generate new OTP
    const otp = user.generateOTP();
    await user.save();

    // Send verification email
    try {
      await emailService.sendVerificationEmail(user.email, otp, user.username);
      return res.status(200).json({ message: "New verification code sent successfully!" });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return res.status(500).json({ message: "Failed to send verification email" });
    }

  } catch (error) {
    console.error("❌ Error in resendOTP:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password_hash } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    if (!user || !(await user.matchPassword(password_hash))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.email_verified) {
      user.clearExpiredOTP();

      // Generate new OTP
      const otp = user.generateOTP();
      await user.save();

      // Send verification email
      try {
        await emailService.sendVerificationEmail(user.email, otp, user.username);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        return res.status(500).json({ message: "Failed to send verification email" });
      }

      return res.status(401).json({ 
        message: "Please verify your email before logging in",
        requiresVerification: true,
        userId: user._id,
        email: user.email
      });
    }

    // Update last login
    user.last_login = new Date();
    await user.save();

    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Error in loginUser:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { email, currentPassword, newPassword, confirmPassword } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.email_verified) {
      return res.status(401).json({ message: "Please verify your email first" });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Validate new password
    const passwordValidation = User.validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        message: "New password does not meet requirements",
        errors: passwordValidation.errors
      });
    }

    user.password_hash = newPassword;
    await user.save();

    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("❌ Error in resetPassword:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};