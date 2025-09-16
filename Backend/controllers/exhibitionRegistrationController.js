import ExhibitionRegistration from "../models/ExhibitionRegistration.js";
import Exhibition from "../models/Exhibition.js";

// Register for an exhibition
export const registerForExhibition = async (req, res) => {
  try {
    const { exhibition_id } = req.body;
    const exhibition = await Exhibition.findById(exhibition_id);
    if (!exhibition) return res.status(404).json({ message: "Exhibition not found" });

    // Check capacity
    if (exhibition.max_capacity && exhibition.current_bookings >= exhibition.max_capacity) {
      return res.status(400).json({ message: "Exhibition is fully booked" });
    }

    // Prevent duplicate registration
    const existing = await ExhibitionRegistration.findOne({
      exhibition_id,
      user_id: req.body.user_id || req.user._id
    });
    if (existing) return res.status(400).json({ message: "Already registered for this exhibition" });

    // Create new registration
    const registration = await ExhibitionRegistration.create({
      ...req.body,
      user_id: req.body.user_id || req.user._id,
      registration_status: "confirmed",
      confirmation_code: Math.random().toString(36).substring(2, 10).toUpperCase()
    });

    // Update current bookings
    exhibition.current_bookings += 1;
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

    if (reg.registration_status === "confirmed") {
      const exhibition = await Exhibition.findById(reg.exhibition_id);
      if (exhibition && exhibition.current_bookings > 0) {
        exhibition.current_bookings -= 1;
        await exhibition.save();
      }
    }

    reg.registration_status = "cancelled";
    await reg.save();

    res.json({ message: "Registration cancelled", reg });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling registration" });
  }
};

// Delete exhibition registration (admin only)
export const deleteExhibitionRegistration = async (req, res) => {
  try {
    const reg = await ExhibitionRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    if (reg.registration_status === "confirmed") {
      const exhibition = await Exhibition.findById(reg.exhibition_id);
      if (exhibition && exhibition.current_bookings > 0) {
        exhibition.current_bookings -= 1;
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
