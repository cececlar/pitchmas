const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const movieRoutes = require("./routes/movieRoutes");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/movies", movieRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
