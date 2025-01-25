const asyncHandler = require("express-async-handler");
const { Photograph } = require("../model/photograph");
createPhotograph = asyncHandler(async (req, res) => {
  const { name, image, location, phoneNumber, price } = req.body;
  console.log(name);
  const newPhotograph = await Photograph.create({
    name,
    image,
    location,
    phoneNumber,
    price,
  });
  return res.status(201).json(newPhotograph);
});
getAllPhotographs = asyncHandler(async (req, res) => {
  const photographs = await Photograph.findAll();
  if (!photographs) {
    return res.status(404).json({ message: "not photographs added yet" });
  }
  return res.status(200).json(photographs);
});
getPhotogeaphById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const photograph = await Photograph.findByPk(id);
  if (!photograph) {
    return res.status(404).json({ message: "the photograph not found" });
  }
  return res.status(200).json(photograph);
});
updatePhotograph = asyncHandler(async (req, res) => {
  const PhotographId = req.params.id;
  const updates = req.body;

  const [updateRows] = await Photograph.update(updates, {
    where: { id: PhotographId },
  });
  console.log(updateRows);

  if (updateRows === 0) {
    return res.status(404).json({ error: "photograph not found" });
  }
  return res.status(200).json({ message: "photograph updated successfully" });
});
module.exports = {
  createPhotograph,
  getAllPhotographs,
  getPhotogeaphById,
  updatePhotograph,
};
