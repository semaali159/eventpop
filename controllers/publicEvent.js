const asyncHandler = require("express-async-handler");
const db = require("../model");
const createEvent = asyncHandler(async (req, res) => {
  //Joi
  const { name, description, image, date, laitude, longitude, price, tickets } =
    req.body;
  //check if event already added
  const event = await db.publicEvent.create({
    name,
    description,
    image,
    date,
    laitude,
    longitude,
    price,
    tickets,
    userId: req.user.id,
  });
  //send notificaton for all followers
  return res.status(201).json({ message: "event created successfuly" });
});
const getAllEvents = asyncHandler(async (req, res) => {
  const events = db.publicEvent.findAll({
    attributes: ["id", "name", "image"],
  });
  if (!events) {
    return res.status(404).json({ message: "events not found" });
  }
  return res.status(404).json({ message: "events: ", events });
});

const getEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = db.publicEvent.findByPk(id, {
    include: [{ model: db.user, attributes: ["id", "name", "image"] }],
  });
  if (!event) {
    return res.status(404).json({ message: "event not found" });
  }
  return res.status(404).json({ message: "events: ", event });
});
const getUpComingEvent = asyncHandler(async (req, res) => {
  const currentTime = Date.now();
  const date = new Date(currentTime);
});
