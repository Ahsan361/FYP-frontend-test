import VisitBooking from "../models/VisitBooking.js";
import Exhibition from "../models/Exhibition.js";

// Create booking
export const createBooking = async (req, res) => {
  try {
    const { exhibition_id, number_of_visitors, total_amount } = req.body;
    const exhibition = await Exhibition.findById(exhibition_id);
    if (!exhibition) return res.status(404).json({ message: "Exhibition not found" });

    if (exhibition.max_capacity && exhibition.current_bookings + number_of_visitors > exhibition.max_capacity) {
      return res.status(400).json({ message: "Exhibition capacity exceeded" });
    }

    const booking = await VisitBooking.create({
      ...req.body,
      user_id: req.user._id,
      booking_status: "confirmed",
      confirmation_code: Math.random().toString(36).substring(2, 10).toUpperCase()
    });

    exhibition.current_bookings += number_of_visitors;
    await exhibition.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

// Get all bookings for an exhibition
export const getBookingsForExhibition = async (req, res) => {
  try {
    const bookings = await VisitBooking.find({ exhibition_id: req.params.exhibitionId })
      .populate("user_id", "username email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// Get my bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await VisitBooking.find({ user_id: req.user._id })
      .populate("exhibition_id", "title start_date end_date location");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching my bookings" });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await VisitBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.booking_status = "cancelled";
    await booking.save();

    const exhibition = await Exhibition.findById(booking.exhibition_id);
    if (exhibition && exhibition.current_bookings >= booking.number_of_visitors) {
      exhibition.current_bookings -= booking.number_of_visitors;
      await exhibition.save();
    }

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking" });
  }
};
