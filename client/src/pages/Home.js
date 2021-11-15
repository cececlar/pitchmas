import React from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "./Home.scss";
const ENDPOINT = "http://127.0.0.1:8080";

export default class Home extends React.Component {
  state = {
    movies: [],
    options: [],
    title: "",
    overview: "",
    selectedWord: "",
  };

  addMovie = (obj) => {
    console.log("Inside addMovie");
  };

  handleSelect = (event) => {
    this.setState({
      selectedWord: event.target.value,
      overview: this.state.overview + " " + event.target.value,
    });
  };

  handleClick = (event) => {
    axios
      .get("/api/movies/titles")
      .then((res) => {
        this.setState({ title: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleKeyDown = (event) => {
    event.preventDefault();
  };

  componentDidMount() {
    this.socket = socketIOClient(ENDPOINT);
    this.socket.on("options", (data) => {
      this.setState({ options: data });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedWord !== this.state.selectedWord) {
      this.socket.emit("selected word", this.state.selectedWord);
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div className="new-movie">
        <h2>Create a holiday movie pitch below.</h2>
        <form onSubmit={this.addMovie} className="new-movie__form">
          <label className="new-movie__label" htmlFor="title">
            Title
          </label>
          <input
            className="new-movie__input"
            type="text"
            name="title"
            id="title"
            onKeyDown={this.handleKeyDown}
            defaultValue={this.state.title}
          ></input>
          <button
            type="button"
            className="new-movie__button"
            onClick={this.handleClick}
          >
            Generate random title
          </button>
          <label className="new-movie__label" htmlFor="overview">
            Overview
          </label>
          <textarea
            className="new-movie__input"
            name="overview"
            id="overview"
            rows={10}
            defaultValue={this.state.overview}
            onKeyDown={this.handleKeyDown}
          ></textarea>
          <div className="next-word__container">
            <button
              type="button"
              className="next-word__button next-word__button--punctuation"
              value="."
              onClick={this.handleSelect}
            >
              .
            </button>
            <button
              type="button"
              className="next-word__button next-word__button--punctuation"
              value="?"
              onClick={this.handleSelect}
            >
              ?
            </button>
            <button
              type="button"
              className="next-word__button next-word__button--punctuation"
              value="!"
              onClick={this.handleSelect}
            >
              !
            </button>
            {this.state.options.length > 0 &&
              this.state.options.map((option, index) => {
                return (
                  <button
                    type="button"
                    className="next-word__button"
                    key={index}
                    value={option}
                    onClick={this.handleSelect}
                  >
                    {option}
                  </button>
                );
              })}
          </div>
          <button className="new-movie__button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
