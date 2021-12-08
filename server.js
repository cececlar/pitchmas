// TODO: Refactor for Heroku deployment.

if (process.env.NODE_ENV !== "production") require("dotenv").config();
require("./server/db/config/index");
const PORT = process.env.PORT;
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = app.listen(8080);
const io = new Server(server, { cors: { origin: "*" } });
const morgan = require("morgan");
const movieRoutes = require("./server/routes/movieRoutes");
const { spawn } = require("child_process");
const overviews = require("./overviews.json");
const path = require("path");

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/movies", movieRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
}

io.on("connection", (socket) => {
  const child = spawn("python", ["./script.py", overviews]);
  let optionsArray = [];

  child.stdout.on("data", (data) => {
    optionsArray = data.toString().split("\n");
    optionsArray.pop();
    io.emit("options", optionsArray);
  });

  socket.on("selected word", (data) => {
    const index = optionsArray.findIndex((element) => element === data);
    if (index !== -1) {
      child.stdin.write(`${String(index)}\n`);
    } else {
      io.emit("options", optionsArray);
    }
  });

  socket.on("shuffle", (data) => {
    optionsArray = overviews
      .split(" ")
      .sort(() => Math.random() - Math.random())
      .slice(0, 20);
    optionsArray = optionsArray.map((word) => {
      word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
      return word;
    });
    io.emit("options", optionsArray);
  });
});

if (process.env.NODE_ENV === "production") {
  // Handle React routing, return all requests to React app
  app.get("*", (request, response) => {
    response.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

if (server) {
  console.log(`Express server running on port ${PORT}`);
}

module.exports = app;
