const asyncHandler = require("express-async-handler");
const Place = require("../model/place");
createPlace = asyncHandler(async (req, res) => {
  //   const { error } = validateAddUser(req.body);
  //   if (error) {
  //     return res.status(400).json({ message: error.details[0].message });
  //   }
  const { name, image, phoneNumber } = req.body;
  const newPlace = await Place.create({ name, image, phoneNumber });
  return res.status(201).json(newPlace);
});
getAllPlaces = asyncHandler(async (req, res) => {
  const places = await Place.findAll();
  return res.status(200).json(places);
});
getPlaceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const place = await Place.findByPk(id);
  if (!place) {
    return res.status(404).json({ message: "place bot found" });
  }
  return res.status(200).json(place);
});

updatePlace = asyncHandler(async (req, res) => {
  const placeId = req.params.id;
  const updates = req.body;
  const [updatedRows] = await Place.update(updates, {
    where: { id: placeId },
  });

  if (updatedRows === 0) {
    return res.status(404).json({ message: "Place not found" });
  }

  return res.status(200).json({ message: "Place updated successfully" });
});
deletePlace = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const place = await Place.findByPk(id);
  if (!place) return res.status(404).json({ error: "place not found" });

  await place.destroy();
  res.status(204).send({ message: "the place destroied successfully" });
});
module.exports = {
  createPlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
};
