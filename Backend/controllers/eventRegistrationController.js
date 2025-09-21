import EventRegistration from "../models/EventRegistration.js";
import Event from "../models/Event.js";

// Register for an event
export const registerForEvent = async (req, res) => {
  try {
    const { event_id, spots_requested = 1, attendees = [] } = req.body;

    // Validate spots_requested
    if (spots_requested < 1 || spots_requested > 10) {
      return res.status(400).json({ message: "Spots requested must be between 1 and 10" });
    }

    // Validate attendees array
    if (attendees.length !== spots_requested) {
      return res.status(400).json({ 
        message: `Number of attendees (${attendees.length}) must match spots requested (${spots_requested})` 
      });
    }

    const event = await Event.findById(event_id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if user meets age restriction
    if (event.age_restriction) {
      const minAge = parseInt(event.age_restriction);
      const underageAttendees = attendees.filter(attendee => attendee.age < minAge);
      if (underageAttendees.length > 0) {
        return res.status(400).json({ 
          message: `All attendees must be at least ${minAge} years old. Found ${underageAttendees.length} underage attendee(s)` 
        });
      }
    }

    // Check capacity (considering spots)
    if (event.requires_registration && event.max_attendees && (event.current_registrations + spots_requested) > event.max_attendees) {
      const availableSpots = event.max_attendees - event.current_registrations;
      return res.status(400).json({ 
        message: `Not enough spots available. Requested: ${spots_requested}, Available: ${availableSpots}` 
      });
    }

    // Prevent duplicate registration for same event by the same user
    const existing = await EventRegistration.findOne({
      event_id,
      user_id: req.body.user_id || req.user._id,
      registration_status: { $ne: 'cancelled' }
    });
    if (existing) return res.status(400).json({ message: "Already registered for this event" });

    // Validate CNIC format
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    const invalidCNICs = attendees.filter(attendee => !cnicRegex.test(attendee.cnic));
    if (invalidCNICs.length > 0) {
      return res.status(400).json({ message: "Invalid CNIC format. Use format: 12345-1234567-1" });
    }

    // Check for duplicate CNICs in the same registration
    const cnics = attendees.map(a => a.cnic);
    const duplicateCNICs = cnics.filter((cnic, index) => cnics.indexOf(cnic) !== index);
    if (duplicateCNICs.length > 0) {
      return res.status(400).json({ message: "Duplicate CNICs found in the same registration" });
    }

    // Check if any CNIC already registered for this event
    const existingRegistrations = await EventRegistration.find({
      event_id,
      registration_status: { $ne: 'cancelled' },
      'attendees.cnic': { $in: cnics }
    });

    if (existingRegistrations.length > 0) {
      const registeredCNICs = [];
      existingRegistrations.forEach(reg => {
        reg.attendees.forEach(attendee => {
          if (cnics.includes(attendee.cnic)) {
            registeredCNICs.push(attendee.cnic);
          }
        });
      });
      return res.status(400).json({ 
        message: `The following CNICs are already registered for this event: ${[...new Set(registeredCNICs)].join(', ')}` 
      });
    }

    // Calculate total amount
    const total_amount = (event.entry_fee || 0) * spots_requested;

    // Create registration
    const registration = await EventRegistration.create({
      ...req.body,
      user_id: req.body.user_id || req.user._id,
      spots_requested,
      attendees,
      total_amount,
      registration_status: "pending",
      confirmation_code: Math.random().toString(36).substring(2, 10).toUpperCase()
    });

    // Update registrations (considering spots, not just +1)
    event.current_registrations += spots_requested;
    await event.save();

    res.status(201).json(registration);
  } catch (error) {
    console.log("❌ Error in registerForEvent:", error);
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

// Update registration
export const updateRegistration = async (req, res) => {
  try {
    const reg = await EventRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    const updated = await EventRegistration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating registration", error: error.message });
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

// Delete registration (admin only)
export const deleteRegistration = async (req, res) => {
  try {
    const reg = await EventRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    // Decrease event registration count if not already cancelled
    const event = await Event.findById(reg.event_id);
    if (event && reg.registration_status !== "cancelled" && event.current_registrations > 0) {
      event.current_registrations -= 1;
      await event.save();
    }

    await reg.deleteOne();

    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting registration", error: error.message });
  }
};

// Get event registration statistics (admin only)
export const getEventRegistrationStats = async (req, res) => {
  try {
    // Get all registrations with populated data
    const registrations = await EventRegistration.find()
      .populate("event_id", "title start_datetime ticket_price")
      .populate("user_id", "username email");

    // Calculate basic stats
    const totalBookings = registrations.length;
    const confirmed = registrations.filter(reg => reg.registration_status === "confirmed").length;
    const pending = registrations.filter(reg => reg.registration_status === "pending").length;
    const cancelled = registrations.filter(reg => reg.registration_status === "cancelled").length;

    // Calculate revenue from paid registrations
    const paidRegistrations = registrations.filter(reg => reg.payment_status === "paid");
    const revenue = paidRegistrations.reduce((sum, reg) => {
      const ticketPrice = reg.event_id?.ticket_price || 0;
      return sum + ticketPrice;
    }, 0);

    // Generate registration trends for the last 7 days
    const registrationTrends = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      
      const dailyRegistrations = registrations.filter(reg => 
        reg.registration_date >= startOfDay && reg.registration_date <= endOfDay
      );
      
      const dailyRevenue = dailyRegistrations
        .filter(reg => reg.payment_status === "paid")
        .reduce((sum, reg) => sum + (reg.event_id?.ticket_price || 0), 0);

      registrationTrends.push({
        date: startOfDay.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
        registrations: dailyRegistrations.length,
        revenue: dailyRevenue
      });
    }

    // Status distribution
    const statusDistribution = [
      { name: 'Confirmed', value: confirmed, color: '#4CAF50' },
      { name: 'Pending', value: pending, color: '#FF9800' },
      { name: 'Cancelled', value: cancelled, color: '#F44336' }
    ];

    // Payment distribution
    const paid = registrations.filter(reg => reg.payment_status === "paid").length;
    const unpaid = registrations.filter(reg => reg.payment_status === "unpaid").length;
    const refunded = registrations.filter(reg => reg.payment_status === "refunded").length;

    const paymentDistribution = [
      { name: 'Paid', value: paid, color: '#4CAF50' },
      { name: 'Unpaid', value: unpaid, color: '#FF9800' },
      { name: 'Refunded', value: refunded, color: '#2196F3' }
    ];

    res.json({
      totalBookings,
      confirmed,
      pending,
      cancelled,
      revenue,
      registrationTrends,
      statusDistribution,
      paymentDistribution
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching registration statistics", error: error.message });
  }
};

// Get all registrations (admin only)
export const getAllRegistrations = async (req, res) => {
  try {
    const regs = await EventRegistration.find()
      .populate("event_id", "title start_datetime ticket_price")
      .populate("user_id", "username email");
    res.json(regs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations", error: error.message });
  }
};

// Confirm registration (admin only)
export const confirmRegistration = async (req, res) => {
  try {
    const reg = await EventRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    reg.registration_status = "confirmed";
    await reg.save();

    res.json({ message: "Registration confirmed", reg });
  } catch (error) {
    res.status(500).json({ message: "Error confirming registration", error: error.message });
  }
};

// Process payment (admin only)
export const processPayment = async (req, res) => {
  try {
    const reg = await EventRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    reg.payment_status = "paid";
    reg.registration_status = "confirmed";
    await reg.save();

    res.json({ message: "Payment processed", reg });
  } catch (error) {
    res.status(500).json({ message: "Error processing payment", error: error.message });
  }
};