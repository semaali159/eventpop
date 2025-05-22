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
  });
  return res.status(201).json({ message: "event created successfuly" });
});
