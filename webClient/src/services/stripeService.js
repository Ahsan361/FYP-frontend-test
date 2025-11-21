// src/services/stripeService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

// Create Stripe Connect Account
export const createConnectAccount = async (token) => {
  const res = await axios.post(`${API_URL}/create-account`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create checkout session
export const createCheckoutSession = async (listingId, quantity, token) => {
  const res = await axios.post(
    `${API_URL}/create-checkout-session`,
    { listingId, quantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};