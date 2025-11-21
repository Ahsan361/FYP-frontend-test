import Order from "../models/Order.js";
import Listing from "../models/Listing.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { listingId, quantity } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    const totalPrice = listing.price * quantity;

    const order = await Order.create({
      buyer: req.user,
      listing: listingId,
      quantity,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
};

// Get all orders for logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user })
      .populate("listing")
      .populate("buyer", "username email");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};
