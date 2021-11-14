# Pitchmas

## Installation instructions

Run the following commands in a terminal window:

```bash
git clone git@github.com:cececlar/pitchmas.git
cd pitchmas && npm i
cp .env.sample .env
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
