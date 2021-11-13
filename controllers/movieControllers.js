const spawn = require("child_process").spawn;
const axios = require("axios");
require("dotenv").config();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = `https://api.themoviedb.org/3`;

// Initial array of movie data
let aggregateData = [];
// To be interpolated into API calls
const apiSearchTerms = ["christmas", "holiday"];

// Function to call TMDB API with different search parameters
const getData = async (searchTerm) => {
  try {
    let data = await axios.get(
      `${TMDB_API_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchTerm}`
    );
    // New array with only relevant data for each movie
    data = data.data.results.map((movie) => {
      const updatedMovie = {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
      };
      return updatedMovie;
    });
    // Updated 1d array of movie data
    aggregateData = aggregateData.concat(...data);
  } catch (e) {
    console.log(e.message);
  }
};

// Function to make multiple API calls (1 for each string in the apiSearchTermsArray)
exports.getAllData = async (req, res) => {
  const apiPromises = apiSearchTerms.map(getData);
  await Promise.all(apiPromises);
  res.json(aggregateData);
};

// Example of how to spawn a python child process and feed data from req.query.
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
