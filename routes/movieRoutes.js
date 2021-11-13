const express = require("express");
const router = express.Router();
const { getAllData, getFullData } = require("../controllers/movieControllers");

router.get("/", getAllData);

// router.get("/:id", getFullData);

module.exports = router;
