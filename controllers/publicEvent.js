const asyncHandler = require("express-async-handler");
const db = require("../model");
const { Op } = require("sequelize");
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
    availableSeats: tickets,
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

const getUpcomingEvents = asyncHandler(async (req, res) => {
  const now = new Date();
  const events = await db.publicEvent.findAll({
    where: {
      date: {
        [Op.gt]: now,
      },
    },
    include: [
      {
        model: db.user,
        attributes: ["id", "name", "image"],
      },
    ],
  });

  if (!events) {
    return res.status(404).json({ message: "No upcoming events found" });
  }

  return res.status(200).json({ message: "Upcoming events", events });
});

const getPastEvents = asyncHandler(async (req, res) => {
  const now = new Date();
  const events = await db.publicEvent.findAll({
    where: {
      date: {
        [Op.lt]: now,
      },
    },
    include: [
      {
        model: db.user,
        attributes: ["id", "name", "image"],
      },
    ],
  });

  if (!events) {
    return res.status(404).json({ message: "no events found" });
  }

  return res.status(200).json({ message: "Past events", events });
});
const getEventByInterest = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const interests = db.userInterest.findAll({ where: { id: userId } });
});
module.exports = {
  getUpcomingEvents,
  getPastEvents,
  getEventById,
  getAllEvents,
  createEvent,
};
