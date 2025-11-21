import Event from "../models/Event.js";
import EventRegistration from "../models/EventRegistration.js";
import { uploadToCloudinary, deleteFromCloudinary, upload } from "../config/cloudinary.js";

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
    let eventData = {
      ...req.body,
      organizer_id: req.user._id
    };

    if (req.files && req.files.length > 0) {
      const uploadResults = await uploadToCloudinary(
        req.files.map(file => file.buffer),
        "miraas/events"
      );
      eventData.eventImage = uploadResults.map(result => ({
        url: result.secure_url,
        publicId: result.public_id
      }));
    } else if (req.file) {
      // Fallback for single file upload
      const uploadResult = await uploadToCloudinary(req.file.buffer, "miraas/events");
      eventData.eventImage = [{
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id
      }];
    }

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event
    });
  } catch (error) {
    console.log("Error in createEvent:", error);
    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message
    });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer_id", "username email");

    // Normalize fields for GenericSection compatibility
    const formattedEvents = events.map(event => {
      const obj = event.toObject();
      return {
        ...obj,
        max_capacity: obj.max_attendees,              // align with exhibitions
        current_bookings: obj.current_registrations,  // align with exhibitions
      };
    });

    res.json(formattedEvents);
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
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const updateData = { ...req.body };

    // Handle image update
    if (req.files && req.files.length > 0) {
      // Delete existing images if they exist
      if (event.eventImage && event.eventImage.length > 0) {
        const publicIds = event.eventImage.map(img => img.publicId).filter(id => id);
        await deleteFromCloudinary(publicIds);
      }
      // Upload new images
      const uploadResults = await uploadToCloudinary(
        req.files.map(file => file.buffer),
        "miraas/events"
      );
      updateData.eventImage = uploadResults.map(result => ({
        url: result.secure_url,
        publicId: result.public_id
      }));
    } else if (req.file) {
      // Fallback for single file upload
      if (event.eventImage && event.eventImage.length > 0) {
        const publicIds = event.eventImage.map(img => img.publicId).filter(id => id);
        await deleteFromCloudinary(publicIds);
      }
      const uploadResult = await uploadToCloudinary(req.file.buffer, "miraas/events");
      updateData.eventImage = [{
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id
      }];
    }

    event = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.log("❌ Error in updateEvent:", error);
    res.status(500).json({
      success: false,
      message: "Error updating event",
      error: error.message
    });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Delete all related registrations
    await EventRegistration.deleteMany({ event_id: req.params.id });

    // Delete related images from Cloudinary
    if (event.eventImage && event.eventImage.length > 0) {
      const publicIds = event.eventImage.map(img => img.publicId).filter(id => id);
      await deleteFromCloudinary(publicIds);
    }

    res.json({ message: "Event and related registrations deleted successfully" });
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