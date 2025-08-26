const express = require("express");
const sequelize = require("./config/connection");
const categoryRoute = require("./routes/category");
const placeRoute = require("./routes/place");
const PhotographRoute = require("./routes/photograph");
const authRoute = require("./routes/authentication");
const interestRoute = require("./routes/interest");
const relationshipRoute = require("./routes/relationship");
const gg = require("./controllers/google");
const profileRoute = require("./routes/profile");
const inviteRoute = require("./routes/invite");
const paymentRoute = require("./routes/payment");
const handleStripeWebhook = require("./controllers/stripeWebhook");
const app = express();
app.use(express.json());
app.use(
  "/webhook/stripe",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);
app.use("/api/category", categoryRoute);
app.use("/api/place", placeRoute);
app.use("/api/photograph", PhotographRoute);
app.use("/api/auth", authRoute);
app.use("/api/interest", interestRoute);
app.use("/api/follow", relationshipRoute);
app.use("/api", gg);
app.use("/api/profile", profileRoute);
app.use("/api/invite", inviteRoute);
app.use("/api/payment", paymentRoute);
console.log("*9************************");
sequelize
  .sync({ force: false })
  .then(() => console.log("Database synced successfully"))
  .catch((error) => console.error("Error syncing database:", error));

const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
