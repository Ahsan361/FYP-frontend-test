import EventRegistration from "../models/EventRegistration.js";
import Event from "../models/Event.js";

// Register for an event
export const registerForEvent = async (req, res) => {
  try {
    const { event_id } = req.body;
    const event = await Event.findById(event_id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.requires_registration && event.max_attendees && event.current_registrations >= event.max_attendees) {
      return res.status(400).json({ message: "Event is fully booked" });
    }

    const registration = await EventRegistration.create({
      ...req.body,
      user_id: req.user._id,
      registration_status: "confirmed",
      confirmation_code: Math.random().toString(36).substring(2, 10).toUpperCase()
    });

    // Update event registration count
    event.current_registrations += 1;
    await event.save();

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: "Error registering for event", error: error.message });
  }
};

// Get all registrations for an event
export const getRegistrationsForEvent = async (req, res) => {
  try {
    const regs = await EventRegistration.find({ event_id: req.params.eventId })
      .populate("user_id", "username email");
    res.json(regs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations" });
  }
};

// Get my registration (user-specific)
export const getMyRegistrations = async (req, res) => {
  try {
    const regs = await EventRegistration.find({ user_id: req.user._id })
      .populate("event_id", "title start_datetime location");
    res.json(regs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching my registrations" });
  }
};

// Cancel registration
export const cancelRegistration = async (req, res) => {
  try {
    const reg = await EventRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    reg.registration_status = "cancelled";
    await reg.save();

    // Decrease count in event
    const event = await Event.findById(reg.event_id);
    if (event && event.current_registrations > 0) {
      event.current_registrations -= 1;
      await event.save();
    }

    res.json({ message: "Registration cancelled", reg });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling registration" });
  }
};
