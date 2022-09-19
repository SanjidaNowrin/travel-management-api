const express = require("express");
const router = express.Router();
const travelController = require("../controllers/travel.controller");

router.route("/").get(travelController.getTravels);
//   .post(travelController.createProduct);

// dynamic id last a hobe
// router
//   .route("/:id")
//   .patch(travelController.updateProductById)
//   .delete(travelController.deleteProductById);
//   .get()
//   .post()
module.exports = router;
