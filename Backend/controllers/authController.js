import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register
export const registerUser = async (req, res) => {
  const { username, email, password_hash } = req.body; // ignore role from client
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Decide role server-side
    const noAdminExists = (await User.countDocuments({ role: "admin" })) === 0;
    const envAdminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
    const shouldBeAdmin = noAdminExists || (envAdminEmail && envAdminEmail === email.toLowerCase());

    const user = await User.create({
      username,
      email,
      password_hash,
      role: shouldBeAdmin ? "admin" : "user",
    });

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Error in registerUser:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Login (unchanged)
export const loginUser = async (req, res) => {
  const { email, password_hash } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password_hash))) {
      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("❌ Error in registerUser:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Reset Password (new)
export const resetPassword = async (req, res) => {
  const { email, currentPassword, newPassword, confirmPassword } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(currentPassword);
    
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    user.password_hash = newPassword;
    await user.save();

    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("❌ Error in resetPassword:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};