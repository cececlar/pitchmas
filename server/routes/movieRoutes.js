const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  createMovie,
} = require("../controllers/movieControllers");

router.get("/", getAllMovies);
router.post("/", createMovie);

module.exports = router;
