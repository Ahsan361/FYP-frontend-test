import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
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

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true,                 // if you’re sending cookies or auth headers
}));

// Mount your routers after the guard:
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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

