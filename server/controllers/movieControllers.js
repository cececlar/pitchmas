const spawn = require("child_process").spawn;
const axios = require("axios");
const Movie = require("../db/models/movie");

exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  if (movies) {
    res.json(movies);
  } else {
    res.status(500).json({ Error: "No movies found." });
  }
};

exports.createMovie = async (req, res) => {
  res.json("POST request made to /api/movies.");
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
