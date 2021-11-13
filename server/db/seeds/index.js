if (process.env.NODE_ENV !== "production") require("dotenv").config();
require("../config/index");

const Movie = require("../models/movie"),
  axios = require("axios"),
  mongoose = require("mongoose"),
  TMDB_API_KEY = process.env.TMDB_API_KEY,
  TMDB_API_URL = `https://api.themoviedb.org/3`;

let aggregateData = [];
// Strings to be interpolated into API calls
const apiSearchTerms = ["christmas", "holiday"];

// Function to call TMDB API with different search parameters
const getSeedDataByTerm = async (searchTerm) => {
  try {
    let data = await axios.get(
      `${TMDB_API_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchTerm}`
    );
    // New array with only relevant data for each movie
    data = refineSeedData(data.data.results);
    // Updated 1d array of movie data
    aggregateData = aggregateData.concat(...data);
  } catch (e) {
    console.log(e.message);
  }
};

const refineSeedData = (array) => {
  const newArray = array.map((obj) => {
    const updatedObj = {
      id: obj.id,
      title: obj.title,
      overview: obj.overview,
    };
    return updatedObj;
  });

  return newArray;
};

// Function to make multiple API calls (1 for each string in the apiSearchTermsArray)
const getAllSeedData = async (req, res) => {
  try {
    const apiPromises = apiSearchTerms.map(getSeedDataByTerm);
    await Promise.all(apiPromises);
    return aggregateData;
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

const dbReset = async () => {
  try {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany();
    }

    const movieCount = await Movie.countDocuments();
    console.log("Number of movies: ", movieCount);

    const movies = await getAllSeedData();
    console.log(movies);

    for (let i = 0; i < movies.length; i++) {
      const newMovie = new Movie(movies[i]);
      await newMovie.save();
    }

    const newMovieCount = await Movie.countDocuments();
    console.log("Number of movies: ", newMovieCount);
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

dbReset();
