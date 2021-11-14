import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateMovie.scss";

export default function CreateMovie() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Inside handleSubmit");
    event.target.reset();
  };
  return (
    <div className="new-movie">
      <form onSubmit={handleSubmit} className="new-movie__form">
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
    </div>
  );
}
