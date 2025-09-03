import Event from "../models/Event.js";

const EVENT_TYPES = {
  CONFERENCE: "conference",
  WORKSHOP: "workshop",
  SEMINAR: "seminar",
  EXHIBITION: "exhibition",
  OTHER: "other"
};

const EVENT_STATUSES = {
  UPCOMING: "upcoming",
  ONGOING: "ongoing",
  COMPLETED: "completed"
};

// Create event
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, organizer_id: req.user._id });
    res.status(201).json(event);
  } catch (error) {
    console.log("❌ Error in createEvent:", error);
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer_id", "username email");
    res.json(events);
  } catch (error) {
    console.log("❌ Error in getEvents:", error);
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
    console.log("❌ Error in getEventById:", error);
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
    console.log("❌ Error in updateEvent:", error);
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
    console.log("❌ Error in deleteEvent:", error);
    res.status(500).json({ message: "Error deleting event" });
  }
};

// 📊 Get Event Stats
export const getEventStats = async (req, res) => {
  try {
    const eventsData = await Event.find();

    // 1. Upcoming events
    const upcomingEvents = eventsData.filter(event => event.status === EVENT_STATUSES.UPCOMING).length;

    // 2. Total registrations
    const totalRegistrations = eventsData.reduce((sum, event) => sum + (event.current_registrations || 0), 0);

    // 3. Revenue generated
    const revenueGenerated = eventsData.reduce((sum, event) => 
      sum + ((event.is_free ? 0 : event.registration_fee * event.current_registrations) || 0), 0
    );

    // 4. Event type distribution
    const typeCounts = eventsData.reduce((acc, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1;
      return acc;
    }, {});

    // Assign colors (you can customize this mapping)
    const eventTypeColors = {
      conference: "primary",
      workshop: "success",
      seminar: "info",
      exhibition: "warning",
      other: "default"
    };

    const typeData = Object.keys(EVENT_TYPES).map(key => ({
      name: EVENT_TYPES[key],
      count: typeCounts[EVENT_TYPES[key]] || 0,
      color:
        eventTypeColors[EVENT_TYPES[key]] === "primary" ? "#627EEA" :
        eventTypeColors[EVENT_TYPES[key]] === "success" ? "#4CAF50" :
        eventTypeColors[EVENT_TYPES[key]] === "info" ? "#F3BA2F" :
        eventTypeColors[EVENT_TYPES[key]] === "warning" ? "#E84142" : "#9E9E9E"
    }));

    res.json({
      upcomingEvents,
      totalRegistrations,
      revenueGenerated,
      typeData
    });

  } catch (error) {
    console.error("❌ Error in getEventStats:", error);
    res.status(500).json({ message: "Error fetching event stats", error: error.message });
  }
};
