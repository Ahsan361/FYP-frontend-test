import User from "../models/User.js";

// Update wallet address
export const updateWalletAddress = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const userId = req.user.id;

    // Validate wallet address format (basic Ethereum address validation)
    const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    
    if (!walletAddress || !walletAddress.trim()) {
      return res.status(400).json({
        success: false,
        message: "Wallet address is required"
      });
    }

    if (!ethereumAddressRegex.test(walletAddress)) {
      return res.status(400).json({
        success: false,
        message: "Invalid wallet address format. Please enter a valid Ethereum address."
      });
    }

    // Check if wallet address is already linked to another user
    const existingWallet = await User.findOne({ 
      walletAddress: walletAddress,
      _id: { $ne: userId }
    });

    if (existingWallet) {
      return res.status(400).json({
        success: false,
        message: "This wallet address is already linked to another account"
      });
    }

    // Update user's wallet information
    const user = await User.findByIdAndUpdate(
      userId,
      {
        walletAddress: walletAddress.trim(),
        isWalletLinked: true
      },
      { new: true }
    ).select("-password_hash -verification_otp -otp_expires_at");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Wallet address linked successfully",
      data: {
        walletAddress: user.walletAddress,
        isWalletLinked: user.isWalletLinked
      }
    });

  } catch (error) {
    console.error("Error in updateWalletAddress:", error);
    res.status(500).json({
      success: false,
      message: "Error updating wallet address",
      error: error.message
    });
  }
};