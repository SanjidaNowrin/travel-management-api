const { getTravelsService } = require("../services/travel.services");

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
