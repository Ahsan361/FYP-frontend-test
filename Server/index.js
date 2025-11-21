// Load environment variables FIRST - before any other imports that might use them
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

//import service
import CleanupService from "./services/cleanupService.js";

//import routes
import artifactRoutes from "./routes/artifactRoutes.js";
import artifactMediaRoutes from "./routes/artifactMediaRoutes.js";
import blockchainRoutes from "./routes/blockchainRoutes.js";
import ownershipRoutes from "./routes/ownershipRoutes.js";
import marketplaceRoutes from "./routes/marketplaceRoutes.js";
import auctionBidRoutes from "./routes/auctionBidRoutes.js";
import exhibitionRoutes from "./routes/exhibitionRoutes.js";
import exhibitionArtifactRoutes from "./routes/exhibitionArtifactRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiProcessingRoutes from "./routes/aiProcessingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import EventRegistration from "./routes/eventRegistrationRoutes.js"
import ExhibitionRegistration from "./routes/exhibitionRegistrationRoutes.js"
import imageRoutes from "./routes/imageRoutes.js";
import stripeWebhookRoutes from "./routes/stripeWebhook.js";
import listingRoutes from "./routes/listingRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import stripeRoutes from "./routes/stripeRoute.js";
import walletSetupRoutes from "./routes/walletSetupRoute.js";

// Connect to database
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true,                 // if you're sending cookies or auth headers
}));


// Mount your routers
app.use("/api/stripe", stripeWebhookRoutes);
app.use("/api/artifacts", artifactRoutes);
app.use("/api/artifact-media", artifactMediaRoutes);
app.use("/api/blockchain", blockchainRoutes);
app.use("/api/ownerships", ownershipRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/bids", auctionBidRoutes);
app.use("/api/exhibitions", exhibitionRoutes);
app.use("/api/exhibition-artifacts", exhibitionArtifactRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai-processing", aiProcessingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/event-registrations", EventRegistration)
app.use("/api/exhibition-registrations", ExhibitionRegistration)
app.use("/api/image-route", imageRoutes);
//blockchain routes
app.use("/api/listings", listingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", stripeRoutes);
app.use("/api/wallet-setup", walletSetupRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});