# Pitchmas

## Installation instructions

Run the following commands in a terminal window:

```bash
git clone git@github.com:cececlar/pitchmas.git
cd pitchmas && npm i
cp .env .env.sample
cd client && npm i
cd ..
code .
```

## Configuration

In the `.env` file:

- Update `PORT` with a port number on which to run the Express server
- Create an account with [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction).
- Update `TMDB_API_KEY` with a valid TMDB API key.
- Update `MONGODB_URL` with a valid MongoDB connection string.

## Usage

To run the Express server, run the following in a terminal window:

```bash
npm run dev
```

To run the React server, run the following in a terminal window:

```bash
cd client && npm start
```

## About Pitchmas

THe purpose of Pitchmas is twofold:

- 1. Practice creating predictive text functionality for a specific corpus.
- 2. Generate holiday movie pitch ideas that poke fun of the genre's most cringeworthy tropes.

The app was inspired by the [Botnik Studios Predictive Writer](https://botnik.org/apps/writer/). It uses a modified version of [Botnik contributor Jamie Brew's open source Python script](https://github.com/jbrew/pt-write) to generate predictive text options for fake holiday movie pitches. Seed data for plot overviews was pulled from [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction) and parsed by the Python script to generate a list of suggestions for the next word in user-generated movie pitches.
