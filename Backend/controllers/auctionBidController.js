import AuctionBid from "../models/AuctionBid.js";
import MarketplaceListing from "../models/MarketplaceListing.js";

// Place a bid
export const placeBid = async (req, res) => {
  try {
    const { listing_id, bid_amount } = req.body;
    const listing = await MarketplaceListing.findById(listing_id);

    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.status !== "active") return res.status(400).json({ message: "Listing not active" });

    // Ensure bid is higher than current
    if (bid_amount <= (listing.current_price || listing.starting_price)) {
      return res.status(400).json({ message: "Bid must be higher than current price" });
    }

    const bid = await AuctionBid.create({
      listing_id,
      bidder_id: req.user._id,
      bid_amount,
      ip_address: req.ip
    });

    // Update listing price
    listing.current_price = bid_amount;
    await listing.save();

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: "Error placing bid", error: error.message });
  }
};

// Get all bids for a listing
export const getBidsForListing = async (req, res) => {
  try {
    const bids = await AuctionBid.find({ listing_id: req.params.listingId })
      .populate("bidder_id", "username email")
      .sort({ bid_amount: -1 });
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bids" });
  }
};

// Get single bid
export const getBidById = async (req, res) => {
  try {
    const bid = await AuctionBid.findById(req.params.id).populate("bidder_id", "username email");
    if (!bid) return res.status(404).json({ message: "Bid not found" });
    res.json(bid);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bid" });
  }
};

// Delete bid (admin only use-case)
export const deleteBid = async (req, res) => {
  try {
    const bid = await AuctionBid.findByIdAndDelete(req.params.id);
    if (!bid) return res.status(404).json({ message: "Bid not found" });
    res.json({ message: "Bid deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bid" });
  }
};
