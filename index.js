const express = require("express");
const sequelize = require("./config/connection");
const categoryRoute = require("./routes/category");
const placeRoute = require("./routes/place");
const PhotographRoute = require("./routes/photograph");
const app = express();
app.use(express.json());
app.use("/api/category", categoryRoute);
app.use("/api/place", placeRoute);
app.use("/api/photograph", PhotographRoute);

sequelize
  .sync({ force: false })
  .then(() => console.log("Database synced successfully"))
  .catch((error) => console.error("Error syncing database:", error));

// تشغيل السيرفر
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
