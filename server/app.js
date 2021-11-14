require("./db/config");
const express = require("express"),
  morgan = require("morgan"),
  movieRoutes = require("./routes/movieRoutes"),
  overviewRoutes = require("./routes/overviewRoutes"),
  app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/movies", movieRoutes);
app.use("/api/overviews", overviewRoutes);

module.exports = app;
