const express = require("express");
const auth = require("../middleware/auth");
const {
  bookService, updateStatus, getMyBookings, getAllBookings
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/book", auth, bookService);
router.put("/:id/status", auth, updateStatus);
router.get("/my", auth, getMyBookings);
router.get("/", auth, getAllBookings);

module.exports = router;
