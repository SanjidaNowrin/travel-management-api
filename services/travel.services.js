const Travel = require("../models/Travels");

exports.getTravelsService = async (filters, queries) => {
  const travels = await Travel.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const totalTravels = await Travel.countDocuments(filters);
  const page = Math.ceil(totalTravels / queries.limit);
  return { travels, totalTravels, page };
};

// post tour
exports.createTravelService = async (data) => {
  const tours = await Travel.create(data);
  return tours;
};
