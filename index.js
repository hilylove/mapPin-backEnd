const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const cors = require("cors");

dotenv.config();

app.use(express.json());

app.options(
  "*",
  cors({
    origin: "https://map-pin-backend.herokuapp.com/",
    optionsSuccessStatus: 200,
  })
);

app.use(
  cors({
    origin: "https://map-pin-backend.herokuapp.com/",
    optionsSuccessStatus: 200,
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

const port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log("Backend server is running");
});
