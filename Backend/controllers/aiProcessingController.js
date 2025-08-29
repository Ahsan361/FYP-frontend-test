import AIProcessing from "../models/AIProcessing.js";

// Create processing job
export const createProcessing = async (req, res) => {
  try {
    const processing = await AIProcessing.create(req.body);
    res.status(201).json(processing);
  } catch (error) {
    res.status(500).json({ message: "Error creating AI processing job", error: error.message });
  }
};

// Get all processing jobs
export const getAllProcessing = async (req, res) => {
  try {
    const jobs = await AIProcessing.find()
      .populate("artifact_id", "title")
      .populate("media_id", "file_name file_url");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

// Get single job
export const getProcessingById = async (req, res) => {
  try {
    const job = await AIProcessing.findById(req.params.id)
      .populate("artifact_id", "title")
      .populate("media_id", "file_name file_url");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job" });
  }
};

// Update job (status/output etc.)
export const updateProcessing = async (req, res) => {
  try {
    const job = await AIProcessing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error updating job" });
  }
};

// Delete job
export const deleteProcessing = async (req, res) => {
  try {
    const job = await AIProcessing.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job" });
  }
};
