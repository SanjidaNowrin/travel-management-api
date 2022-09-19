const express = require("express");
const router = express.Router();
const travelController = require("../controllers/travel.controller");

router
  .route("/")
  .get(travelController.getTravels)
  .post(travelController.createTravel);

router.route("/:id").get(travelController.getTourById);

module.exports = router;
