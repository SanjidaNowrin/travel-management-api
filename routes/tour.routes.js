const express = require("express");
const router = express.Router();
const travelController = require("../controllers/travel.controller");

router.route("/cheapest").get(travelController.getCheapestTour);
router.route("/trending").get(travelController.getTrendingTour);

router.route("/:id").patch(travelController.updateTourById);

module.exports = router;
