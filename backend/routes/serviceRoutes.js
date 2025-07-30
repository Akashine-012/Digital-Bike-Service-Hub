const express = require("express");
const auth = require("../middleware/auth");
const {
  createService, updateService, deleteService, getAllServices
} = require("../controllers/serviceController");

const router = express.Router();

router.post("/", auth, createService);
router.put("/:id", auth, updateService);
router.delete("/:id", auth, deleteService);
router.get("/", getAllServices);

module.exports = router;
