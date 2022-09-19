const {
  getTravelsService,
  createTravelService,
  getTourByIdService,
  updateTourByIdService,
  cheapestTourService,
  trendingTourService,
} = require("../services/travel.services");

exports.getTravels = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    // sort,page,limit->exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    // sorting by  price
    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join("");
      queries.sortBy = sortBy;
      console.log(sortBy); //price,quantity ->price quantity
    }
    // select some specific fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }
    // pagination
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const travels = await getTravelsService(filters, queries);
    res.status(200).json({
      status: "success",
      data: travels,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

// Post tours
exports.createTravel = async (req, res, next) => {
  try {
    const result = await createTravelService(req.body);
    res.status(200).json({
      status: "success",
      message: "Tours inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Tours is not inserted",
      error: error.message,
    });
  }
};

// get tour by id
exports.getTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getTourByIdService(id);
    res.status(200).json({
      status: "success",
      message: "Successfully get the tour",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could not get the tour",
      error: error.message,
    });
  }
};

// update tour by id
exports.updateTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateTourByIdService(id, req.body);
    res.status(200).json({
      data: result,
      status: "success",
      message: "Successfully update the tour",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could not update the tour",
      error: error.message,
    });
  }
};
// get trending tour
exports.getTrendingTour = async (req, res, next) => {
  try {
    const trendTours = await trendingTourService(req.query);
    res.status(200).json({
      data: trendTours,
      status: "success",
      message: "Successfully get the trend tour",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could not get the trend tour",
      error: error.message,
    });
  }
};

// top 3 cheapest tour
exports.getCheapestTour = async (req, res, next) => {
  try {
    const cheapestTours = await cheapestTourService(req.query);
    res.status(200).json({
      data: cheapestTours,
      status: "success",
      message: "Successfully get the cheapest tour",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could not get the cheapest tour",
      error: error.message,
    });
  }
};
