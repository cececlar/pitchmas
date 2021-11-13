const spawn = require("child_process").spawn;
const axios = require("axios");
const Movie = require("../db/models/movie");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (e) {
    res.json({ Error: e.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const { title, overview } = req.body;
    const newMovie = new Movie({ title, overview });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (e) {
    res.json({ Error: e.message });
  }
};

// Example of how to spawn a python child process and feed data from req.query
// TODO: Update code block so that all movie overviews are fed to python child process for eventually creating a corpus of text made up of Christmas movie overviews.

// exports.getMovieData = (req, res) => {
//   const process = spawn("python", [
//     "./script.py",
//     req.query.firstname,
//     req.query.lastname,
//   ]);

//   process.stdout.on("data", (data) => {
//     res.send(data.toString());
//   });
// };
