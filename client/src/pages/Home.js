import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h2>I am the Home page.</h2>
      {movies.length > 1 && <p>Movies loaded.</p>}
    </div>
  );
}
