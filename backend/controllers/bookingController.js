const Booking = require("../models/Booking");
const Service = require("../models/Service");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

exports.bookService = async (req, res) => {
  const { serviceId, date } = req.body;

  const existing = await Booking.findOne({ service: serviceId, date });
  if (existing) {
    return res.status(400).json({ message: "Date already booked" });
  }

  const service = await Service.findById(serviceId).populate("ownerId");
  const customer = await User.findById(req.user.id);

  const booking = await Booking.create({
    service: serviceId,
    date,
    customer: req.user.id
  });

  // Send email to the service owner
  await sendEmail(
    service.ownerId.email,
    "New Service Booking",
    `<p>Hello ${service.ownerId.name},</p>
     <p>A new booking has been made for <strong>${service.name}</strong> on <strong>${date}</strong> by ${customer.name} (${customer.email}).</p>`
  );

  res.json({ message: "Booked. Waiting for owner confirmation." });
};


exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).populate("service").populate("customer");

  if (!booking) return res.status(404).json({ message: "Booking not found" });

  let subject = "";
  let message = "";

  if (status === "accepted") {
    subject = "Your service has been accepted!";
    message = `<p>Your booking for <strong>${booking.service.name}</strong> has been accepted. We'll notify you when it's ready.</p>`;
  } else if (status === "ready") {
    subject = "Your service is ready!";
    message = `<p>Good news! Your booking for <strong>${booking.service.name}</strong> is now ready for pickup/delivery.</p>`;
  } else if (status === "completed") {
    subject = "Service completed – Thank you!";
    message = `<p>Your service for <strong>${booking.service.name}</strong> has been completed. Thank you for choosing us!</p>`;
  }

  if (subject && message) {
    await sendEmail(booking.customer.email, subject, message);
  }

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
