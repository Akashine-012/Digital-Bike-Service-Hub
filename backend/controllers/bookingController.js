const Booking = require("../models/Booking");
const Service = require("../models/Service");
const User = require("../models/User");

exports.bookService = async (req, res) => {
  const { serviceId, date } = req.body;

  // Check if the service is already booked on the given date
  const existing = await Booking.findOne({ service: serviceId, date });
  if (existing) {
    return res.status(400).json({ message: "Date already booked" });
  }

  // Create the new booking
  await Booking.create({
    service: serviceId,
    date,
    customer: req.user.id
  });

  // Note: Email sending is removed

  res.json({ message: "Booked. Waiting for owner confirmation." });
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });

  // Note: Email sending to customer is removed

  res.json({ message: "Status updated" });
};

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ customer: req.user.id }).populate("service");
  res.json(bookings);
};

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate("service").populate("customer");
  res.json(bookings);
};
