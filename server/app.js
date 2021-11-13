require("./db/config");
const express = require("express"),
  morgan = require("morgan"),
  movieRoutes = require("./routes/movieRoutes"),
  app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/movies", movieRoutes);

module.exports = app;
