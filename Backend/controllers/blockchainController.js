import BlockchainRecord from "../models/BlockchainRecord.js";

// Create blockchain record
export const createRecord = async (req, res) => {
  try {
    const record = await BlockchainRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: "Error creating blockchain record", error: error.message });
  }
};

// Get all records
export const getAllRecords = async (req, res) => {
  try {
    const records = await BlockchainRecord.find().populate("artifact_id", "title");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records" });
  }
};

// Get single record
export const getRecordById = async (req, res) => {
  try {
    const record = await BlockchainRecord.findById(req.params.id).populate("artifact_id", "title");
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Error fetching record" });
  }
};

// Update record
export const updateRecord = async (req, res) => {
  try {
    const record = await BlockchainRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Error updating record" });
  }
};

// Delete record
export const deleteRecord = async (req, res) => {
  try {
    const record = await BlockchainRecord.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting record" });
  }
};
