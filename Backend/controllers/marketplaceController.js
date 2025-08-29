import MarketplaceListing from "../models/MarketplaceListing.js";

// Create listing
export const createListing = async (req, res) => {
  try {
    const listing = await MarketplaceListing.create({ ...req.body, seller_id: req.user._id });
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error creating listing", error: error.message });
  }
};

// Get all listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await MarketplaceListing.find()
      .populate("artifact_id", "title")
      .populate("seller_id", "username email");
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings" });
  }
};

// Get single listing
export const getListingById = async (req, res) => {
  try {
    const listing = await MarketplaceListing.findById(req.params.id)
      .populate("artifact_id", "title")
      .populate("seller_id", "username email");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listing" });
  }
};

// Update listing
export const updateListing = async (req, res) => {
  try {
    const listing = await MarketplaceListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error updating listing" });
  }
};

// Delete listing
export const deleteListing = async (req, res) => {
  try {
    const listing = await MarketplaceListing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting listing" });
  }
};
