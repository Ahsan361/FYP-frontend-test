// controllers/listingController.js
import Listing from "../models/Listing.js";
import { ethers } from "ethers";
import { nftContract, marketContract } from "../blockchain/contracts.js";
import protect from "../middleware/authMiddleware.js";

import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// Create new listing
export const createListing = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;

    console.log("==============================================");
    console.log("Backend wallet balance:", ethers.formatEther(await provider.getBalance(req.user.walletAddress)));
    console.log("NFT Contract owner:", await nftContract.owner());
    console.log("User wallet:", req.user.walletAddress);
    console.log("==============================================");

    // 1️⃣ Mint NFT directly to the user (Zain)
    const mintTx = await nftContract.mint(req.user.walletAddress, image);
    const receipt = await mintTx.wait();

    // 2️⃣ Parse Transfer event to get tokenId
    const transferEvent = receipt.logs
      .map(log => {
        try {
          return nftContract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find(event => event && event.name === "Transfer");

    if (!transferEvent) throw new Error("Transfer event not found");

    const tokenId = transferEvent.args.tokenId.toString();
    console.log("Minted tokenId:", tokenId);

    // 3️⃣ List NFT on Marketplace (Ahsan as admin)
    const priceInWei = ethers.parseEther(price.toString());

    const listTx = await marketContract.list(tokenId, priceInWei);
    await listTx.wait();

    // 4️⃣ Save listing in your DB
    const newListing = await Listing.create({
      title,
      description,
      price,
      image,
      seller: req.user, // NFT owner
      contractAddress: process.env.NFT_CONTRACT,
      tokenId,
      status: "active",
    });

    res.status(201).json(newListing);
  } catch (err) {
    console.error("Full error:", err);
    res.status(500).json({ message: "Error creating listing", error: err.message });
  }
};


// Get all listings
export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate("seller", "username email");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching listings", error: err.message });
  }
};

// Get single listing
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("seller", "username email");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Error fetching listing", error: err.message });
  }
};

// Update listing (Admin only - no blockchain changes, just DB)
export const updateListing = async (req, res) => {
  try {
    const { title, description, price, status } = req.body;
    
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { title, description, price, status },
      { new: true }
    ).populate("seller", "username email");
    
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Error updating listing", error: err.message });
  }
};

// Delete listing (Admin only)
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting listing", error: err.message });
  }
};

// Get listing stats (for Admin Dashboard)
export const getListingStats = async (req, res) => {
  try {
    const listings = await Listing.find();

    const activeListings = listings.filter(l => l.status === "active").length;
    const soldListings = listings.filter(l => l.status === "sold").length;
    const cancelledListings = listings.filter(l => l.status === "cancelled").length;
    
    const totalRevenue = listings.reduce((sum, l) => {
      if (l.status === "sold") {
        return sum + (l.price || 0);
      }
      return sum;
    }, 0);

    res.json({
      activeListings,
      soldListings,
      cancelledListings,
      totalRevenue,
      totalListings: listings.length
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
};