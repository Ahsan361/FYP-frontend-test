// services/walletSetupService.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/wallet-setup`;

// Update wallet address
export const updateWalletAddress = async (walletAddress, token) => {
  const res = await axios.put(
    `${API_URL}/wallet`, 
    { walletAddress },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// Get wallet status (optional - reuses existing profile endpoint)
export const getWalletStatus = async (token) => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return {
    walletAddress: res.data.walletAddress,
    isWalletLinked: res.data.isWalletLinked
  };
};