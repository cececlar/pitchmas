const Movie = require("../db/models/movie");
const titles = require("../../titles.json");

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

const startsWithVowel = (str) => {
  const firstLetter = str.charAt(0);
  if (
    firstLetter == "a" ||
    firstLetter == "e" ||
    firstLetter == "i" ||
    firstLetter == "o" ||
    firstLetter == "u"
  ) {
    return true;
  }
  return false;
};

exports.generateTitle = async (req, res) => {
  try {
    let particle =
      titles.particles[Math.floor(Math.random() * titles.particles.length)];
    const adjOne =
      titles.adjOne[Math.floor(Math.random() * titles.adjOne.length)];
    const adjTwo =
      titles.adjTwo[Math.floor(Math.random() * titles.adjTwo.length)];
    const noun = titles.nouns[Math.floor(Math.random() * titles.nouns.length)];
    if (startsWithVowel(adjOne) && particle === "a") {
      particle = "an";
    } else if (!startsWithVowel(adjOne) && particle === "an") {
      particle = "a";
    } else {
      particle = particle;
    }
    const title = `${particle} ${adjOne} ${adjTwo} ${noun}`;
    res.json(title);
  } catch (e) {
    res.json({ Error: e.message });
  }
};
