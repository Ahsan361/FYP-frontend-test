import Event from "../models/Event.js";

// Create event
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, organizer_id: req.user._id });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer_id", "username email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// Get single event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizer_id", "username email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event" });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error updating event" });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event" });
  }
};
