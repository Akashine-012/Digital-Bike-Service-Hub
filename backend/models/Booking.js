const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "ready", "completed"],
    default: "pending"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
