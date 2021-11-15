const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  createMovie,
  generateTitle,
} = require("../controllers/movieControllers");

router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/titles", generateTitle);

module.exports = router;
