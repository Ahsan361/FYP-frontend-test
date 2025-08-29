import OwnershipHistory from "../models/OwnershipHistory.js";

// Create ownership record
export const createOwnership = async (req, res) => {
  try {
    const record = await OwnershipHistory.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: "Error creating ownership record", error: error.message });
  }
};

// Get all ownership records
export const getAllOwnerships = async (req, res) => {
  try {
    const records = await OwnershipHistory.find()
      .populate("artifact_id", "title")
      .populate("previous_owner_id", "username email")
      .populate("current_owner_id", "username email")
      .populate("blockchain_record_id", "transaction_hash");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ownership records" });
  }
};

// Get ownership record by ID
export const getOwnershipById = async (req, res) => {
  try {
    const record = await OwnershipHistory.findById(req.params.id)
      .populate("artifact_id", "title")
      .populate("previous_owner_id", "username")
      .populate("current_owner_id", "username")
      .populate("blockchain_record_id", "transaction_hash");
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Error fetching record" });
  }
};

// Update ownership
export const updateOwnership = async (req, res) => {
  try {
    const record = await OwnershipHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Error updating record" });
  }
};

// Delete ownership
export const deleteOwnership = async (req, res) => {
  try {
    const record = await OwnershipHistory.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Ownership record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting record" });
  }
};
