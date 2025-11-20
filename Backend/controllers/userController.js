// controllers/userController.js
import User from "../models/User.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

// Admin: Add new user
export const addUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      phone_number,
      profile_picture_url,
      role,
      is_active,
      email_verified,
    } = req.body;

    // Check if user already exists
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username});
    
    if (existingEmail) {
      return res.status(400).json({ message: "User already exists with this email" });
    } 

    if (existingUsername) {
      return res.status(400).json({ message: "User already exists with this username" });
    } 

    // Create new user
    const newUser = new User({
      username,
      email,
      password_hash: password,
      first_name,
      last_name,
      phone_number,
      profile_picture_url,
      role,
      is_active: is_active ?? true,
      email_verified: email_verified ?? false,
    });
    
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, "miraas/users");
      newUser.profileImage = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
    }
    const savedUser = await newUser.save();

    // Hide password hash before sending response
    const { password_hash, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("❌ Error in addUser:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// Get profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password_hash");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Admin: Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password_hash");
    res.json(users);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Admin: Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password_hash");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.profile_picture_url = req.body.avatar || user.profile_picture_url;
    user.role = req.body.role || user.role;
    user.is_active = req.body.is_active ?? user.is_active;
    user.email_verified = req.body.email_verified ?? user.email_verified;

    if (req.file) {
      // If user already has an image, delete old one first
      if (user.profileImage?.publicId) {
        await deleteFromCloudinary(user.profileImage.publicId);
      }

      // Upload new image to Cloudinary
      const uploadResult = await uploadToCloudinary(req.file.buffer, "miraas/users");
      user.profileImage = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
    }

    const updatedUser = await user.save();
    
    // Return without password
    const { password_hash, ...userWithoutPassword } = updatedUser.toObject();
    res.json(userWithoutPassword);

  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete related image from cloud too
    if (user.profileImage?.publicId) {
      await deleteFromCloudinary(user.profileImage.publicId);
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteUser:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

// Admin: Get user statistics
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ is_active: true });
    const inactiveUsers = totalUsers - activeUsers;

    res.json({ totalUsers, activeUsers, inactiveUsers });
  } catch (error) {
    console.error("Error in getUserStats:", error);
    res.status(500).json({ message: "Error fetching stats" });
  }
};

// ============ MARKETPLACE ADDITIONS ============

// Check Stripe account status
export const checkStripeStatus = async (req, res) => {
  try {
    const userId = req.user._id; // from authMiddleware
    const user = await User.findById(userId).select('stripeAccountId');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      hasStripeAccount: !!user.stripeAccountId,
      stripeAccountId: user.stripeAccountId || null,
    });
  } catch (err) {
    console.error("Error checking Stripe status:", err);
    res.status(500).json({ message: "Error checking Stripe status", error: err.message });
  }
};