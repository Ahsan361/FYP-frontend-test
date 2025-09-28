import ExhibitionRegistration from "../models/ExhibitionRegistration.js";
import Exhibition from "../models/Exhibition.js";

// Register for an exhibition
export const registerForExhibition = async (req, res) => {
  try {
    const { exhibition_id, spots_requested = 1, attendees = [] } = req.body;
    
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

    const exhibition = await Exhibition.findById(exhibition_id);
    if (!exhibition) return res.status(404).json({ message: "Exhibition not found" });

    // Check if user meets age restriction
    if (exhibition.age_restriction) {
      const minAge = parseInt(exhibition.age_restriction);
      const underageAttendees = attendees.filter(attendee => attendee.age < minAge);
      if (underageAttendees.length > 0) {
        return res.status(400).json({ 
          message: `All attendees must be at least ${minAge} years old. Found ${underageAttendees.length} underage attendee(s)` 
        });
      }
    }

    // Check capacity (now considering multiple spots)
    if (exhibition.max_capacity && (exhibition.current_bookings + spots_requested) > exhibition.max_capacity) {
      const availableSpots = exhibition.max_capacity - exhibition.current_bookings;
      return res.status(400).json({ 
        message: `Not enough spots available. Requested: ${spots_requested}, Available: ${availableSpots}` 
      });
    }

    // Prevent duplicate registration for the same exhibition by the same user
    const existing = await ExhibitionRegistration.findOne({
      exhibition_id,
      user_id: req.body.user_id || req.user._id,
      registration_status: { $ne: 'cancelled' }
    });
    if (existing) return res.status(400).json({ message: "Already registered for this exhibition" });

    // Validate CNIC format for each attendee
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    const invalidCNICs = attendees.filter(attendee => !cnicRegex.test(attendee.cnic));
    if (invalidCNICs.length > 0) {
      return res.status(400).json({ 
        message: "Invalid CNIC format. Use format: 12345-1234567-1" 
      });
    }

    // Check for duplicate CNICs in the same registration
    const cnics = attendees.map(a => a.cnic);
    const duplicateCNICs = cnics.filter((cnic, index) => cnics.indexOf(cnic) !== index);
    if (duplicateCNICs.length > 0) {
      return res.status(400).json({ 
        message: "Duplicate CNICs found in the same registration" 
      });
    }

    // Check if any CNIC is already registered for this exhibition
    const existingRegistrations = await ExhibitionRegistration.find({
      exhibition_id,
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
        message: `The following CNICs are already registered for this exhibition: ${[...new Set(registeredCNICs)].join(', ')}` 
      });
    }

    // Calculate total amount
    const total_amount = (exhibition.entry_fee || 0) * spots_requested;

    // Create new registration
    const registration = await ExhibitionRegistration.create({
      ...req.body,
      user_id: req.body.user_id || req.user._id,
      spots_requested,
      attendees,
      total_amount,
      registration_status: "pending",
      confirmation_code: Math.random().toString(36).substring(2, 10).toUpperCase()
    });

    // Update current bookings (now by spots_requested, not just +1)
    exhibition.current_bookings += spots_requested;
    await exhibition.save();

    res.status(201).json(registration);
  } catch (error) {
    console.log("❌ Error in registerForExhibition:", error);
    res.status(500).json({ message: "Error registering for exhibition", error: error.message });
  }
};

// Get all registrations for an exhibition
export const getRegistrationsForExhibition = async (req, res) => {
  try {
    const regs = await ExhibitionRegistration.find({ exhibition_id: req.params.exhibitionId })
      .populate("user_id", "username email");
    res.json(regs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations" });
  }
};

// Get my exhibition registrations
export const getMyExhibitionRegistrations = async (req, res) => {
  try {
    const regs = await ExhibitionRegistration.find({ user_id: req.user._id })
      .populate("exhibition_id", "title start_date end_date location");
    res.json(regs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching my registrations" });
  }
};

// Update exhibition registration
export const updateExhibitionRegistration = async (req, res) => {
  try {
    const reg = await ExhibitionRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    const updated = await ExhibitionRegistration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating registration", error: error.message });
  }
};

// Cancel exhibition registration
export const cancelExhibitionRegistration = async (req, res) => {
  try {
    const reg = await ExhibitionRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    if (reg.registration_status === "confirmed" || reg.registration_status === "pending") {
      const exhibition = await Exhibition.findById(reg.exhibition_id);
      if (exhibition && exhibition.current_bookings > 0) {
        exhibition.current_bookings = Math.max(0, exhibition.current_bookings - reg.spots_requested);
        await exhibition.save();
      }
    }
    reg.registration_status = "cancelled";
    await reg.save();

    res.json({ message: "Registration cancelled", reg });
  } catch (error) {
    console.log("❌ Error in cancelExhibitionRegistration:", error);
    res.status(500).json({ message: "Error cancelling registration" });
  }
};

// Delete exhibition registration 
export const deleteExhibitionRegistration = async (req, res) => {
  try {
    const reg = await ExhibitionRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    if (reg.registration_status === "confirmed" || reg.registration_status === "pending") {
      const exhibition = await Exhibition.findById(reg.exhibition_id);
      if (exhibition && exhibition.current_bookings > 0) {
        exhibition.current_bookings = Math.max(0, exhibition.current_bookings - reg.spots_requested);
        await exhibition.save();
      }
    }

    await reg.deleteOne();

    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting registration", error: error.message });
  }
};

// Get exhibition registration statistics (admin only)
export const getExhibitionRegistrationStats = async (req, res) => {
  try {
    const registrations = await ExhibitionRegistration.find()
      .populate("exhibition_id", "title start_date end_date entry_fee")
      .populate("user_id", "username email");

    const totalBookings = registrations.length;
    const confirmed = registrations.filter(reg => reg.registration_status === "confirmed").length;
    const pending = registrations.filter(reg => reg.registration_status === "pending").length;
    const cancelled = registrations.filter(reg => reg.registration_status === "cancelled").length;

    const paidRegistrations = registrations.filter(reg => reg.payment_status === "paid");
    const revenue = paidRegistrations.reduce((sum, reg) => {
      const fee = reg.exhibition_id?.entry_fee || 0;
      return sum + fee;
    }, 0);

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
        .reduce((sum, reg) => sum + (reg.exhibition_id?.entry_fee || 0), 0);

      registrationTrends.push({
        date: startOfDay.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
        registrations: dailyRegistrations.length,
        revenue: dailyRevenue
      });
    }

    const statusDistribution = [
      { name: 'Confirmed', value: confirmed, color: '#4CAF50' },
      { name: 'Pending', value: pending, color: '#FF9800' },
      { name: 'Cancelled', value: cancelled, color: '#F44336' }
    ];

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

// Get all exhibition registrations (admin only)
export const getAllExhibitionRegistrations = async (req, res) => {
  try {
    const regs = await ExhibitionRegistration.find()
      .populate("exhibition_id", "title start_date end_date entry_fee")
      .populate("user_id", "username email");
    res.json(regs);
  } catch (error) {
    console.log("❌ Error in getAllExhibitionRegistrations:", error);
    res.status(500).json({ message: "Error fetching registrations", error: error.message });
  }
};

// Confirm exhibition registration (admin only)
export const confirmExhibitionRegistration = async (req, res) => {
  try {
    const reg = await ExhibitionRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    if (reg.registration_status !== "confirmed") {
      const exhibition = await Exhibition.findById(reg.exhibition_id);
      if (exhibition && exhibition.max_capacity && exhibition.current_bookings >= exhibition.max_capacity) {
        return res.status(400).json({ message: "Exhibition is fully booked" });
      }
      if (exhibition) {
        exhibition.current_bookings += 1;
        await exhibition.save();
      }
    }

    reg.registration_status = "confirmed";
    await reg.save();

    res.json({ message: "Registration confirmed", reg });
  } catch (error) {
    res.status(500).json({ message: "Error confirming registration", error: error.message });
  }
};

// Process exhibition payment (admin only)
export const processExhibitionPayment = async (req, res) => {
  try {
    const reg = await ExhibitionRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    if (reg.registration_status !== "confirmed") {
      const exhibition = await Exhibition.findById(reg.exhibition_id);
      if (exhibition && exhibition.max_capacity && exhibition.current_bookings >= exhibition.max_capacity) {
        return res.status(400).json({ message: "Exhibition is fully booked" });
      }
      if (exhibition) {
        exhibition.current_bookings += 1;
        await exhibition.save();
      }
    }

    reg.payment_status = "paid";
    reg.registration_status = "confirmed";
    await reg.save();

    res.json({ message: "Payment processed", reg });
  } catch (error) {
    res.status(500).json({ message: "Error processing payment", error: error.message });
  }
};
