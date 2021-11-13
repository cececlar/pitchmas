const express = require("express");
const router = express.Router();
const { getAllSeedData } = require("../controllers/movieControllers");

router.get("/", getAllSeedData);

module.exports = router;
