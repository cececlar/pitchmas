import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateMovie from "../components/CreateMovie/CreateMovie";
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
      console.log(data);
    });
  }, []);
  return (
    <div>
      <h2>I am the Home page.</h2>
      <CreateMovie addMovie={addMovie} />
    </div>
  );
}
