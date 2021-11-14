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
