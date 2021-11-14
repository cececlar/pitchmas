import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8080";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [options, setOptions] = useState([]);

  const addMovie = (obj) => {
    console.log("Inside addMovie");
  };

  useEffect(() => {
    axios.get("/api/movies").then((res) => {
      console.log(res.data);
    });
    const socket = socketIOClient(ENDPOINT);

    socket.on("options", (data) => {
      data = data.split("\n");
      data.pop();
      setOptions(data);
    });
  }, []);
  return (
    <div>
      <h2>I am the Home page.</h2>
      <form onSubmit={addMovie} className="new-movie__form">
        <label className="new-movie__label" htmlFor="title">
          Title
        </label>
        <input
          className="new-movie__input"
          type="text"
          name="title"
          id="title"
        ></input>
        <label className="new-movie__label" htmlFor="overview">
          Overview
        </label>
        <input
          className="new-movie__input"
          type="textarea"
          name="overview"
          id="overview"
        ></input>
        <button className="new-movie__button" type="submit">
          Submit
        </button>
      </form>
      {options.length > 0 &&
        options.map((option) => {
          return <p>{option}</p>;
        })}
    </div>
  );
}
