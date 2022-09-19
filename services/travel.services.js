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

// get tour by id
exports.getTourByIdService = async (tourId) => {
  const result = await Travel.findOne({ _id: tourId });
  return result;
};

//update tour by id
exports.updateTourByIdService = async (tourId, data) => {
  const result = await Travel.updateOne(
    { _id: tourId },
    { $set: data },
    { runValidators: true } //validate body
  );
  return result;
};

// top 3 cheapest tour
exports.cheapestTourService = async () => {
  const cheap = await Travel.find({}).sort({ price: 1 }).limit(3);
  return cheap;
};
